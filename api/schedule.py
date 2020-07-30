from flask import Flask, request
from flask_cors import CORS

from helper_functions import get_movies

app = Flask(__name__)
CORS(app)

@app.route('/api/schedule', methods = ['POST'])
def create_schedule():
    data = request.json

    # Get filtered data from database
    platforms = [platform for platform, has_platform in data['hasPlatforms'].items() if has_platform]
    if data['genreDealbreaker']:
        include_genres = data['genrePreferences']['likes'] if len(data['genrePreferences']['likes']) > 0 else None
        exclude_genres = data['genrePreferences']['dislikes'] if len(data['genrePreferences']['dislikes']) > 0 else None
    else:
        include_genres = None
        exclude_genres = None

    movies = get_movies(platforms, include_genres, exclude_genres)

    # Add preference factors to ratings

    # Create optimal schedule
    return {'schedule': len(movies)}