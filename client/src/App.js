import React, { Component, useState } from "react";
import "./App.css";
import PlayingFrom from "./components/PlayingFrom";
import NowPlaying from "./components/NowPlaying";
import SpotifyWebApi from "spotify-web-api-js";
import Header from "./components/Header";

const App = () => {
  const spotifyApi = new SpotifyWebApi();
  const [nowPlaying, setNowPlaying] = useState()
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const params = getHashParams();
  const token = params.access_token;
  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        setNowPlaying(response.item)
        console.log(response)
      });
    
    }

  return (
    <div>
      <Header />
      <button onClick={() => getNowPlaying()}>Get Current Song</button>
      <NowPlaying playback={nowPlaying} />
      {console.log(nowPlaying)}
      <PlayingFrom playback={nowPlaying} />
    </div>
  );
};

export default App;
