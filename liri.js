require("dotenv").config();

var request = require('request');
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var querystring = require('querystring');
var fs = require("fs");
var nodeArgs = process.argv;
var website = process.argv[2];
var input = "";
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

for (var i = 3; i < nodeArgs.length; i++) {


  if (i > 3 && i < nodeArgs.length) {

    input = input + "%20" + nodeArgs[i];

  }

  else {

    input += nodeArgs[i];

  }
}

switch (website) {
  case "concert-this":
    concert();
    break;

  case "movie-this":
    movie();
    break;

  case "spotify-this-song":
    song();
    break;

  case "do-what-it-says":
    doIt();
    break;
}

function concert() {

  request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {


    if (!error && response.statusCode === 200) {


      console.log("The event will be at:" + JSON.parse(body)[0].venue.name);
      console.log("Located in:" + JSON.parse(body)[0].venue.city + "," + JSON.parse(body)[0].venue.region);
      console.log("The following date:" + JSON.parse(body)[0].datetime.substr(5, 2) + "/" + JSON.parse(body)[0].datetime.substr(8, 2) + "/" + JSON.parse(body)[0].datetime.substr(0, 4));


    }


  });


}
function movie() {

  if (website === "movie-this" && input === "") {
    return console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");

  }
  else {
    request("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy", function (error, response, body) {


      if (!error && response.statusCode === 200) {


        console.log("Title:" + JSON.parse(body).Title);
        console.log("Year:" + JSON.parse(body).Year);
        console.log("Imbd Rating:" + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating:" + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in:" + JSON.parse(body).Country);
        console.log("Languages:" + JSON.parse(body).Language);
        console.log("Plot:" + JSON.parse(body).Plot);
        console.log("Actors:" + JSON.parse(body).Actors)







      }
    });

  }

}
function song() {
  spotify
    .search({ type: 'track', query: input })
    .then(function (response) {

      var i = 0;

      do {

        console.log("Artist/Band: " + response.tracks.items[i].artists[0].name);
        console.log("Song: " + response.tracks.items[3].name);
        console.log("Album: " + response.tracks.items[3].album.name);
        console.log("Link preview: " + response.tracks.items[3].external_urls.spotify);
        console.log("----------------------------/n");



        i++;

      }
      while (i < 5);
    })
    .catch(function (err) {
      console.log(err);
    });


}
function doIt() {
  fs.readFile('./random.txt', "utf8", function read(err, data) {
    if (err) {
      throw err;
    }

    var text = data.split(",");

    website = text[0];
    input = text[1];

    

    song();
  });

}




