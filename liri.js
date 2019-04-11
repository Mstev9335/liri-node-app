// require
require("dotenv").config();

// variables
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var option = process.argv[2];
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

function concert(artist) {
    // Add code to query the bands in town api searching for the artist received as an argument to this function

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var artistName = $("<h1>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });

}


//   spotify-this-song function
function song(userInput) {
    var spotify = new Spotify(keys.spotify);

    // check if user entered song, if not default to "the sign" 
    if (!userInput) {
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
                return console.log('Error occurred: ' + err);
            }

            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
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