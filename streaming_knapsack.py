# -*- coding: utf-8 -*-
"""
Knapsack algorithm that optimizes movie view for an allotted time
Inputs:
    - df: Dataframe of all possble movies with their value and duration (in minutes)
            ***NOTE: the script assumes the Dataframe is sorted by duration in descending order!!!!!
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
    #points = df['IMDb'].to_dict()
    points = (df['IMDb']*df['Runtime']).to_dict()
    
    #Create memoization Matrix
    n = len(title.keys())
    value_memo = [[0 for j in range (time + 1)] for i in range(n+1)]
    title_memo = [[[] for j in range (time + 1)] for i in range(n+1)]

    # Loop through the memoization matrix to find the best solution, save maovie titles as you go
    for i in range(1,n+1):
        
        movie_name  = title[i-1]
        movie_time  = int(duration[i-1])
        movie_value = points[i-1]
        
        j = movie_time
        while j <= time:
            if value_memo[i-1][j-movie_time] + movie_value > value_memo[i-1][j]:
                value_memo[i][j] = value_memo[i-1][j-movie_time] + movie_value
                title_memo[i][j] = title_memo[i-1][j-movie_time].copy()
                title_memo[i][j].append(movie_name)
            else:
                value_memo[i][j] = value_memo[i-1][j]
                title_memo[i][j] = title_memo[i-1][j].copy()
            j += 1
                      
    # retrieve the best value and list of movies  
    total_value = value_memo[n][time]
    movie_selection = title_memo[n][time]
    
    #remove movies from the dataframe so that we can use the updated df for the next mini knapsack
    df_remaining = df[~df['Title'].isin(movie_selection)]
    df_remaining = df_remaining.reset_index(drop=True)
    
    return df_remaining , total_value , movie_selection


'''
Below is practice code and the framework for how to call the knapsack algorithm
multiple times, per user input
'''


#Example Input
time_dataframe = {'days': 5, 
                  'minutes': 300}


#Framework to loop through the knapsack and save off the data
df = pd.read_csv('movie_data.csv') 

movies = {}
values = {}

#import time as t
#start = t.time()
for i in range(time_dataframe['days']):
    df , total_value , movie_selection = streaming_knapsack(df, time_dataframe['minutes'])
    values[i+1] = int(round(total_value,0))
    movies[i+1] = movie_selection
#end = t.time()
#print('time = ', end - start) 


#Print Results    
for key in movies:
    print('timeslot #', key, ':', values[key], ':', movies[key])





