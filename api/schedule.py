from flask import Flask, request
import simplejson as json

from .helper_functions import get_movies, build_schedule

app = Flask(__name__)

@app.route('/api/schedule', methods = ['POST'])
def schedule():
    data = request.json
    print(data)

    is_dealbreaker = data['genreDealbreaker']
    likes = data['genrePreferences']['likes']
    dislikes = data['genrePreferences']['dislikes']
    has_platforms = data['hasPlatforms']
    bad_movie_binge = data['badMovieBinge']
    age_selections = data['ageSelections']
    country_selections = data['countrySelections']
    language_selections = data['languageSelections']


    # Get filtered data from database
    platforms = [platform for platform, has_platform in has_platforms.items() if has_platform]
    if is_dealbreaker:
        include_genres = likes if len(likes) > 0 else None
        exclude_genres = dislikes if len(dislikes) > 0 else None
    else:
        include_genres = None
        exclude_genres = None 

    movies = get_movies(platforms, include_genres, exclude_genres, bad_movie_binge, age_selections, country_selections, language_selections)

    # Add preference factors to ratings
    if not is_dealbreaker:
        for movie in movies:
            like_counts = len(set(likes).intersection(set(movie['Genres'])))
            dislike_counts = len(set(dislikes).intersection(set(movie['Genres'])))
            boost = (1.2 ** like_counts) * (.8 ** dislike_counts)
            movie['IMDb_norm'] *= boost

    # Create optimal schedule
    schedule = build_schedule(movies, data['timeChunks'])

    # Format response (e.g. convert NaNs to nulls)
    schedule = json.loads(json.dumps(schedule, ignore_nan=True))

    return { 'schedule': schedule  }