from pymongo import MongoClient

from .config import MONGO_URL

client = MongoClient(MONGO_URL)
db = client.StreamingAndChillDB

def get_movies(platforms, include_genres, exclude_genres):
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
    
    movies = list(db.movies.find({ '$and': [platform_filter, genre_filter]}).sort('IMDb', 1))

    return movies
