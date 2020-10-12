async function SpotifyTrackList(id) {
  var SpotifyWebApi = require("spotify-web-api-node");

  // credentials are optional
  var spotifyApi = new SpotifyWebApi({
    clientId: "7f1c807b29964124956d0592ad6542df",
    clientSecret: "c4733ea98a184bcc9fdc69bc8e167b5b",
  });

  var trackList = [];

  var credentials = await spotifyApi.clientCredentialsGrant();

  spotifyApi.setAccessToken(credentials.body["access_token"]);

  apiTrackList = (await spotifyApi.getPlaylist(id)).body.tracks.items;

  for (var i = 0; i < apiTrackList.length; i++) {
    trackList.push({
      releaseDate: apiTrackList[i].track.album.release_date,
      name: apiTrackList[i].track.name,
      artistID: apiTrackList[i].track.artists[0].id,
      artistName: apiTrackList[i].track.artists[0].name,
    });
  }


  return trackList;
}

module.exports = SpotifyTrackList;
