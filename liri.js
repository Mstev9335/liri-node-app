// require
require("dotenv").config();

// variables
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// arguments
// liri command
var option = process.argv[2];

// argument to be searched
var userInput = process.argv[3];

// switch case
switch (option) {
    case "concert-this":
        concert(userInput);
        break;

    case "spotify-this-song":
        song(userInput);
        break;

    case "movie-this":
        movie(userInput);
        break;

    case "do-what-it-says":
        doWhat();
        break;

    default:
        console.log("invalid selection");
}

// ==================== functions =================================

// concert-this function
function concert(userInput){
    console.log(userInput);
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var concerts = JSON.parse(body);
        for (var i = 0; i < concerts.length; i++) { 
            console.log("Events: ");
            console.log("----------------------------")   
            console.log("Name of Venue: " + concerts[i].venue.name);
            console.log("Venue Location: " +  concerts[i].venue.city);
            console.log("Date of the Event: " +  concerts[i].datetime);
            console.log("----------------------------");
        }
    } else{
      console.log('Error');
    }
});}


//   spotify-this-song function
function song(userInput) {
    var spotify = new Spotify(keys.spotify);

    // check if user entered song
    //  if not default to "the sign" 
    if (userInput === undefined) {
        userInput = "The Sign";
    };

    console.log(userInput);

    // search spotify for the song name
    spotify.search({
        type: "track",
        query: userInput
    },
        function (err, data) {
            if (err) {
                return console.log('Error: ' + err);
            }

            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log("Spotify Info: ")
                console.log("--------------------")
                console.log("Song name: " + songs[i].name);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("---------------------");
            }

        });
};


//   movie-this function
function movie(userInput) {
    // check if the user entered a movie
    // if not, default to mr. nobody
    if (userInput === undefined) {
        userInput = "Mr. Nobody";
    }
    console.log(userInput);
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            //   console.log(response.data);
            console.log("Movie Info: ");
            console.log("------------------");
            console.log("The movie's title is: " + response.data.Title);
            console.log("The movie's year is: " + response.data.Year);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("The movie's country of release is: " + response.data.Country);
            console.log("The movie's language is: " + response.data.Language);
            console.log("The movie's plot is: " + response.data.Plot);
            console.log("The movie's actors are: " + response.data.Actors);
            console.log("------------------");
        }
    );

}

// do-what-it-says function
function doWhat() {
    // spotify-this-song the song from the random.txt file
}