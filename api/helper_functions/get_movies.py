from pymongo import MongoClient

import os
from dotenv import load_dotenv
load_dotenv()
MONGO_URL = os.environ['MONGO_URL']

def get_movies(platforms, include_genres, exclude_genres, bad_movie_binge):
    client = MongoClient(MONGO_URL)
    db = client.StreamingAndChillDB

    platform_filter = {
        # Filter checks to see if movie is available on any of the user's platforms
        '$or': list(map(lambda platform: { platform: 1}, platforms))
    }

    # Genre filters
    if include_genres:
        genre_filter = { 'Genres': { '$in': include_genres } }
    elif exclude_genres:
        genre_filter = { 'Genres': { '$nin': exclude_genres } }
    else:
        genre_filter = {}

    # Ratings Filter
    rating_filter = { 'IMDb_norm': { '$lt' if bad_movie_binge else '$gt': 0 }}
    
    movies = list(db.movies.find({ '$and': [platform_filter, genre_filter, rating_filter]}).sort('Runtime', -1))

    # If bad movie binge, flip every rating
    if bad_movie_binge:
        for movie in movies:
            movie['IMDb_norm'] *= -1

    return movies
