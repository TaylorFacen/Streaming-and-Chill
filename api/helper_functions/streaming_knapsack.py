# -*- coding: utf-8 -*-
"""
Knapsack algorithm that optimizes movie view for an allotted time
Inputs:
    - df: Dataframe of all possble movies with their value and duration (in minutes)
            ***NOTE: the script assumes the Dataframe is sorted by duration in descending order!!!!!
    - time: time (in munites) of the 'knapsack'
Outputs:
    - total_value: dictionary for the amount of 'points' awarded for the optimized movie set in the knapsack
    - movie_selection: dictioanry of movies where the Key is an ID
    - ID_selection: dictionary listing movie IDs selected in each knapsack
    - df_remaining: dataframe will remaining possible movies (movie selection is removed)
"""

import pandas as pd
import math

def build_schedule(movies, time_chunks):
    df = pd.DataFrame(movies)
    
    #Framework to loop through the knapsack and save off the data
    selected_movies = []
    values = {}
    IDs = {}
    sequels_for_later = pd.DataFrame(columns = df.columns)
    
    for i, time_chunk in enumerate(time_chunks):
        sequel = True
        while sequel:
            df , total_value , ID_selection, movie_selection, movie_selection_df = streaming_knapsack(df, time_chunk)
            #If no sequal was added
            if all(pd.isnull(movie_selection_df.Series_Order)):
                # exit while loop
                sequel = False
            #If a sequel was added
            else:
                #get the questionable sequel movies and loop through
                questionable_movies = movie_selection_df[~pd.isnull(movie_selection_df.Series_Order)].sort_values(by='Series_Order')
                for index , row in questionable_movies.iterrows():
                    Series_ID = row['Series_ID']
                    Series_Order = row['Series_Order']
                    # Check if Series_Order is equal to the first in the dataframe, if it is, set sequl = False and continue
                    if  math.isnan(df[df['Series_ID'] == Series_ID]['Series_Order'].min()) or (df[df['Series_ID'] == Series_ID]['Series_Order'].min() >= Series_Order):
                        sequel = False
                    # If the prequel has not been added to the knapsack
                    else:
                        sequel = True
                        # add back selected movies to knapsack, but not the sequel and re-sort on runtime
                        df = df.append(movie_selection_df[~((movie_selection_df['Series_Order'] == Series_Order) & (movie_selection_df['Series_ID'] == Series_ID)) ])
                        df = df.sort_values(by='Runtime', ascending=False).reset_index(drop=True)
                        # add sequel to sequels_for_later
                        sequels_for_later = sequels_for_later.append(row).reset_index(drop=True)
                        # break out of for loop and run through the while loop again
                        print('entered')
                        print(df)
                        print('')
                        print(sequels_for_later)
                        print('')
                        break
        
 
        values[i+1] = int(round(total_value,0))
        selected_movies.append(movie_selection)
        IDs[i+1] = ID_selection
        #print(movie_selection_df['Title'])
        #print('')
        
        #the following code checks if any sequels can be added back into the dataframe
        #If sequal_for _later is not empty, loop through the sequels 
        if not sequels_for_later.empty:
            sequels_for_later = sequels_for_later.sort_values(by='Series_Order', ascending = False) # <--- Ascending = False allows for multiple movies to be added back
            sequels_for_later_copy = sequels_for_later.copy()
            added_back = False
            for index , row in sequels_for_later_copy.iterrows():
                Series_ID = row['Series_ID']
                Series_Order = row['Series_Order']
                # check if prequel is now in our knapsack
                if math.isnan(df[df['Series_ID'] == Series_ID]['Series_Order'].min()) or (df[df['Series_ID'] == Series_ID]['Series_Order'].min() >= Series_Order):
                    #Add sequel back into the dataframe
                    df = df.append(row)
                    added_back = True
                    #And remove sequel from sequels_for_later
                    sequels_for_later = sequels_for_later[~(sequels_for_later['Title'] == row['Title'])]    
            if added_back:
                df = df.sort_values(by='Runtime', ascending=False).reset_index(drop=True)
        
        
        
    return selected_movies


def streaming_knapsack(df, time):
    
    # Get movie names, duration, and points as dictionaries
    ID = df['_id'].to_dict()
    duration = df['Runtime'].to_dict()
    points = (df['IMDb_norm']*df['Runtime']).to_dict()
    
    #Create memoization Matrix
    chunks = 5 #must be a factor of 60
    n = len(points.keys())
    value_memo = [[0 for j in range (0,time + 1, chunks)] for i in range(n+1)]
    ID_memo   = [[[] for j in range (0,time + 1, chunks)] for i in range(n+1)]

    # Loop through the memoization matrix to find the best solution, save movie titles as you go
    for i in range(1,n+1): 

        movie_ID = ID[i-1]
        movie_time  = math.ceil(int(duration[i-1])/chunks)
        movie_value = points[i-1]
        
        j = movie_time
        while j <= int(time/chunks):

            if value_memo[i-1][j-movie_time] + movie_value > value_memo[i-1][j]:
                value_memo[i][j] = value_memo[i-1][j-movie_time] + movie_value
                ID_memo[i][j] = ID_memo[i-1][j-movie_time].copy()
                ID_memo[i][j].append(movie_ID)
            else:
                value_memo[i][j] = value_memo[i-1][j]
                ID_memo[i][j] = ID_memo[i-1][j].copy()
            j += 1
    
    
    # retrieve the best value and list of movies  
    total_value = value_memo[n][int(time/chunks)]
    ID_selection = ID_memo[n][int(time/chunks)]
   
    #Retrieve all movie information for the selected movies
    movie_selections = []
    movie_selection_df = pd.DataFrame(columns = df.columns)
    for i in ID_selection:
        movie_selections.append(df.loc[df['_id'] == i].to_dict('r')[0])
        movie_selection_df = movie_selection_df.append(df.loc[df['_id'] == i])

    #remove movies from the dataframe so that we can use the updated df for the next mini knapsack
    df_remaining = df[~df['_id'].isin(ID_selection)]
    df_remaining = df_remaining.reset_index(drop=True)
    
    return df_remaining , total_value , ID_selection, movie_selections, movie_selection_df