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

import pandas as  pd

def build_schedule(movies, time_chunks):
    df = pd.DataFrame(movies)

    #Framework to loop through the knapsack and save off the data
    selected_movies = []
    values = {}
    IDs = {}
    for i, time_chunk in enumerate(time_chunks):
        df , total_value , ID_selection, movie_selection = streaming_knapsack(df, time_chunk)
        values[i+1] = int(round(total_value,0))
        selected_movies.append(movie_selection)
        IDs[i+1] = ID_selection

    return selected_movies


def streaming_knapsack(df, time):
    
    # Get movie names, duration, and points as dictionaries
    ID = df['_id'].to_dict()
    duration = df['Runtime'].to_dict()
    points = (df['IMDb_norm']*df['Runtime']).to_dict()
    
    #Create memoization Matrix
    n = len(points.keys())
    value_memo = [[0 for j in range (time + 1)] for i in range(n+1)]
    ID_memo = [[[] for j in range (time + 1)] for i in range(n+1)]

    # Loop through the memoization matrix to find the best solution, save movie titles as you go
    for i in range(1,n+1):
        
        movie_ID = ID[i-1]
        movie_time  = int(duration[i-1])
        movie_value = points[i-1]
        
        j = movie_time
        while j <= time:
            if value_memo[i-1][j-movie_time] + movie_value > value_memo[i-1][j]:
                value_memo[i][j] = value_memo[i-1][j-movie_time] + movie_value
                ID_memo[i][j] = ID_memo[i-1][j-movie_time].copy()
                ID_memo[i][j].append(movie_ID)
            else:
                value_memo[i][j] = value_memo[i-1][j]
                ID_memo[i][j] = ID_memo[i-1][j].copy()
            j += 1
                      
    # retrieve the best value and list of movies  
    total_value = value_memo[n][time]
    ID_selection = ID_memo[n][time]
   
    #Retrieve all movie information for the selected movies
    movie_selections = []
    for i in ID_selection:
        movie_selections.append(df.loc[df['_id'] == i].to_dict('r')[0])

    #remove movies from the dataframe so that we can use the updated df for the next mini knapsack
    df_remaining = df[~df['_id'].isin(ID_selection)]
    df_remaining = df_remaining.reset_index(drop=True)
    
    return df_remaining , total_value , ID_selection, movie_selections

