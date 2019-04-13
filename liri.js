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

function options(option, userInput) {
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
}
// ======================= functions ==================================

// concert-this function
function concert(userInput) {
    console.log(userInput);
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("Events: ");
                console.log("----------------------------")
                console.log("Name of Venue: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.city);
                console.log("Date of the Event: " + concerts[i].datetime);
                console.log("----------------------------");
            }
        } else {
            console.log('Error');
        }
    });
}

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

            console.log(response.data);

            // get rotten tomatoes score
            var rotten = JSON.stringify(response.data.Ratings[1].Value);

            console.log("Movie Info: ");
            console.log("------------------");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + rotten);
            console.log("Country of release: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("------------------");
        }
    );
}

// do-what-it-says function
function doWhat() {
    // spotify-this-song the song from the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

        // split by comma
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);

        options(dataArr[0], dataArr[1]);

    });

}

options(option, userInput); 