import pandas as pd

# ----- Importing / Manipulating Data ------- #

# Import
df = pd.read_csv('MoviesOnStreamingPlatforms_updated.csv',index_col=0)
# Modify
df['Rotten Tomatoes'] = df['Rotten Tomatoes'].str.rstrip('%').astype('float') / 100.0
df.dropna(subset = ['IMDb','Runtime','Genres'], inplace=True)
df.Age.fillna('18+', inplace=True)
df['Genres'] = df.Genres.apply(lambda x: x.split(','))
# Split off test set
df_test = df[df.ID <= 100].reset_index(drop=True)

# ------------------------------------------- #


# ------- Variables ---------- #

size = 20160 # minutes in two weeks
user_inputs = {} # We'll need this at some point, unsure of structure

# ---------------------------- # 


# ------ Basic Data Analysis ------ #

# Finding missing values
def num_missing(x):
  return sum(x.isnull())

# Print number missing values per column:
print("Missing values per column:")
print(df.apply(num_missing, axis=0))

# Counting number of genres 
Counts = pd.Series(sum([item for item in df.Genres], [])).value_counts()

# -------------------------------- # 


