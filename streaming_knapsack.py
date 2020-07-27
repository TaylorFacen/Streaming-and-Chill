# -*- coding: utf-8 -*-
"""
Knapsack algorithm that optimizes movie view for an allotted time
Inputs:
    - df: Dataframe of all possble movies with their value and duration (in minutes)
    - time: time (in munites) of the 'knapsack'
Outputs:
    - total_value: amount of 'points' awarded for the optimized movie set in the knapsack
    - movie_selection: List of movies to watch
    - df_remaining: dataframe will remaining possible movies (movie selection is removed)
"""

import pandas as  pd

def streaming_knapsack(df, time):
    
    # Get movie names, duration, and points as dictionaries
    title  = df['Title'].to_dict()
    duration = df['Runtime'].to_dict()
    points = df['IMDb'].to_dict()
    
    #Create memoization Matrix
    n = len(title.keys())
    value_memo = [[0 for j in range (time + 1)] for i in range(n+1)]
    title_memo = [[[] for j in range (time + 1)] for i in range(n+1)]

    # Loop through the memoization matrix to find the best solution, save maovie titles as you go
    for i in range(1,n+1):
        
        movie_name  = title[i-1]
        movie_time  = int(duration[i-1])
        movie_value = points[i-1]
        
        for j in range(1, time + 1):
            if movie_time <= j:
                
                if value_memo[i-1][j-movie_time] + movie_value > value_memo[i-1][j]:
                    value_memo[i][j] = value_memo[i-1][j-movie_time] + movie_value
                    title_memo[i][j] = title_memo[i-1][j-movie_time].copy()
                    title_memo[i][j].append(movie_name)
                else:
                    value_memo[i][j] = value_memo[i-1][j]
                    title_memo[i][j] = title_memo[i-1][j].copy()
            else:
                value_memo[i][j] = value_memo[i-1][j]
                title_memo[i][j] = title_memo[i-1][j].copy()
            
            
    # retrieve the best value and list of movies  
    total_value = value_memo[n][time]
    movie_selection = title_memo[n][time]
    
    #remove movies from the dataframe so that we can use the updated df for the next mini knapsack
    df = df[~df['Title'].isin(movie_selection)]
    df = df.reset_index(drop=True)
    
    return df , total_value , movie_selection



# Practice Code
df = pd.read_csv('movie_data.csv')

dff = df[0:100]
time = 60*5
df2 , total_value2 , movie_selection2 = streaming_knapsack(df, time)
df3 , total_value3 , movie_selection3 = streaming_knapsack(df2, time)









