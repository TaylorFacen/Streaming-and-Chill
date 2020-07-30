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

def streaming_knapsack(df, time):
    
    # Get movie names, duration, and points as dictionaries
    ID = df['ID'].to_dict()
    duration = df['Runtime'].to_dict()
    points = (df['IMDb']*df['Runtime']).to_dict()
    
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
    movie_selection = {}
    for i in ID_selection:
        movie_selection[i] = df.loc[df['ID'] == i].to_dict('r')[0]

    #remove movies from the dataframe so that we can use the updated df for the next mini knapsack
    df_remaining = df[~df['ID'].isin(ID_selection)]
    df_remaining = df_remaining.reset_index(drop=True)
    
    return df_remaining , total_value , ID_selection, movie_selection

#----------------------------------------------------------------------------#

'''
Below is practice code and the framework for how to call the knapsack algorithm
multiple times, per user input
'''

#Example Input (Comment out in real deal)
minutes = 5*60
days = 2
streaming_input = {'timeChunks': [minutes]*days }
df = pd.read_csv('movie_data.csv')

#----------------------------------------------------------------------------#

#Framework to loop through the knapsack and save off the data
movies = {}
values = {}
IDs = {}

for i in range(len(streaming_input['timeChunks'])):
    df , total_value , ID_selection, movie_selection = streaming_knapsack(df, streaming_input['timeChunks'][i])
    values[i+1] = int(round(total_value,0))
    movies[i+1] = movie_selection
    IDs[i+1] = ID_selection

#----------------------------------------------------------------------------#

#Print Solution
for i in movies.keys():
    print('binge session', i)
    print('  ', 'value =', values[i])
    print('  ', 'movie selection:')
    for j in IDs[i]:
        print('     ' , movies[i][j]['Title'])
    print('')



