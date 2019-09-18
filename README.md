# liri-node-app
This application allows the user to enter in Node.js command line arguments and receive relevant data back.  The app uses the Bands in Town API to search for upcoming events for a particular artist, the Spotify API to search for songs, the OMDB API to search for movies, and uses the fs node package to read from a .txt file and perform the liri command that is contained within.

## Technologies used:
* HTML
* CSS
* Javascript
* Node
* Bands in Town API
* Spotify API
* OMDB API

## How to install
1. You first need to clone this repo to your local computer
2. You need to obtain Spotify API keys to make the Spotify LIRI command functional
3. You then need to create a .env file that will contain the Spotifiy API keys in the root directory of this cloned repo
Setup your .env file with the following lines of code:
```javascript

SPOTIFY_ID=<your spotify id here>
SPOTIFY_SECRET=<your spotify secret here>

```

## Concert-this functionality
### Searches for upcoming concerts by the band that the user inputs
![concert-this functionality](/screenshots/concert-this.png)


## Spotify-this functionality
### Searches for song information based on the song name that the user inputs
![spotify-this functionality](/screenshots/spotify-this.png)


## Movie-this functionality
### Searches for movie details based on the movie entered by the user
![movie-this functionality](/screenshots/movie-this.png)


## Do-what-it-says functionality
### Reads a command from a text document and uses this command to perform one of the LIRI commands
![do-what-it-says functionality](/screenshots/do-what-it-says1.png)
