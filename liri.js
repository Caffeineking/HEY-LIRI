require("dotenv").config();
// var keys = require("./keys.js"); // #8
// var spotify = new Spotify(keys.spotify);
// var Spotify = require('node-spotify-api'); 

const Spotify = require(`node-spotify-api`); // what are the backticks exclusive to const and require? i couldnt use " " or ' '
const keys = require(`./keys.js`);
const spotify = new Spotify(keys.spotify);
var request = require("request"); // activity 18 omdb, then, npm install require

var a = process.argv[2]; // operator
var b = process.argv.slice(3); // search parameter on song

var moment = require('moment');
var fs = require("fs");

// spotify
if (a === 'spotify-this-song' && b.length >= 1) {
  spotifySearch();
}
if (a === 'spotify-this-song' && b.length === 0) { // if there are no search 
  b = "The Sign by Ace of Base";
  spotifySearch();
}
//movie api
if (a === 'movie-this' && b.length >= 1) {
  movieSearch();
}
if (a === 'movie-this' && b.length === 0) {
  emptyMovieSearch();
}
//concert api
if (a === 'concert-this' && b.length >= 1) {
  concertSearch();
}
// random song for spotify
if (a === 'do-what-it-says' && b.length === 0) {
  randomRandom();
}
//make a movie function
function movieSearch() {
  var movieName = b; // reassign user input
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body).Year);
      var body_body = JSON.parse(body); // I have to convert the obect into parsed and store into a var in able to read it     
      console.log("Released in: " + body_body.Year);
      console.log("IMDB rating: " + body_body.imdbRating);
      console.log("Rotten Tomato Ratings: " + body_body.Ratings[1].Value);
      console.log("Country where the movie was produced: " + body_body.Country);
      console.log("Language available: " + body_body.Language);
      console.log("Plot: " + body_body.Plot);
      console.log("Actors: " + body_body.Actors);
    }
  })
};
// for empty movie
function emptyMovieSearch() { 
  var queryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {      
      var body_body = JSON.parse(body); // I have to convert the obect into parsed and store into a var in able to read it     
      console.log("Released in: " + body_body.Year);
      console.log("IMDB rating: " + body_body.imdbRating);
      console.log("Rotten Tomato Ratings: " + body_body.Ratings[1].Value);
      console.log("Country where the movie was produced: " + body_body.Country);
      console.log("Language available: " + body_body.Language);
      console.log("Plot: " + body_body.Plot);
      console.log("Actors: " + body_body.Actors);
    }
  })
};
//spotify api
function spotifySearch() { // search function for spotify
  console.log('spotify is loaded');
  spotify.search({
    type: 'track',
    query: b
  }, function (err, data, result) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var searchResult = data.tracks.items // combined to make search easier    
    console.log(searchResult[0].artists[0].name); //grabs the name     
    console.log(searchResult[0].name); // prints out the album's name
    console.log(searchResult[0].preview_url); // preview url
    console.log(searchResult[0].album.name); // album name
  })
};
//concert api
function concertSearch() {
  var artist = b;
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  request(queryURL, function (error, result, body) {
    if (error) console.log(error);
    var body_body = JSON.parse(body)[0];
    console.log("Venue name: " + body_body.venue.name);  
    console.log("Location: " + body_body.venue.city);
    console.log("Event Date: " + moment(result.datetime).format("MM/DD/YYYY"));
  });
};
// for the fs
function randomRandom() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      b = data; // reassign value
      spotifySearch();
    }
  });
}