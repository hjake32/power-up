import React, { Component, useState, useEffect } from "react";
import "./App.css";
import PlayingFrom from "./components/PlayingFrom";
import NowPlaying from "./components/NowPlaying";
import SpotifyWebApi from "spotify-web-api-js";
import "react-banner/dist/style.css";
import {Route, BrowserRouter} from 'react-router-dom'
import { render } from "react-dom";

const App = () => {
  const spotifyApi = new SpotifyWebApi();
  const [nowPlaying, setNowPlaying] = useState();
  const [userId, setUserId] = useState();

  //Get and set access Token
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
  else {
      return (
        <div>
          <a href="htttp://localhost:8888">Login</a>
        </div>
      );
  }
  //End of token work

  useEffect(() => {
    loadCurrentPlayback();
    getMyUserId();
  }, []);

  const loadCurrentPlayback = () => {
    getNowPlaying();
    checkTimeAndUpdate();
  };

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      setNowPlaying(response);
    });
  };

  const getMyUserId = () => {
    spotifyApi.getMe().then((response) => {
      setUserId(response.id);
    });
  };

  const checkTimeAndUpdate = () => {
    if (nowPlaying) {
      var timeLeft = nowPlaying.item.duration_ms - nowPlaying.progress_ms
      console.log(timeLeft);

      setTimeout(() => {
        loadCurrentPlayback();
      }, timeLeft)
      return () => clearTimeout()
    }
  };

  return (
    <div>
      <button onClick={() => loadCurrentPlayback()}>Get Current Song</button>
      <NowPlaying playback={nowPlaying ? nowPlaying.item : ""} />
      <PlayingFrom
        playback={nowPlaying ? nowPlaying : ""}
        userId={userId}
      />
    </div>
  );
};

export default App;
