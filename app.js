var app = require("express")(),
  SpotifyWebApi = require("spotify-web-api-node"),
  spotifyApi = new SpotifyWebApi({
    clientId: "7f1c807b29964124956d0592ad6542df",
    clientSecret: "c4733ea98a184bcc9fdc69bc8e167b5b",
  }),
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

async function getTrackList(id) {
  await SpotifyTrackList(id);
}

// --DEFAULT Route--
app.get("/", async (req, res) => {
  var id = "37i9dQZF1DX873GaRGUmPl";
  var trackList = [];

  var credentials = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(credentials.body["access_token"]);

  apiTrackList = (await spotifyApi.getPlaylist(id)).body.tracks.items;

  for (var i = 0; i < apiTrackList.length; i++) {
    trackList.push({
      releaseDate: apiTrackList[i].track.album.release_date,
      name: apiTrackList[i].track.name,
      albumArt: apiTrackList[i].track.album.images[0].url,
      artistName: apiTrackList[i].track.artists[0].name,
      url: apiTrackList[i].track.external_urls.spotify,
    });
  }

  res.render("landing.ejs", { tracks: await trackList });
});

app.listen(3000, function () {
  console.log("Server Has Started.");
});
