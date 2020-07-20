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
          <a href="http://localhost:8888">Login</a>
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
    let startMs = 60000;
    let durationMs = 60000;

    if (nowPlaying) {
      if (nowPlaying.item.duration_ms < 120000){
        startMs = 30000;
      }
      else if (nowPlaying.item.duration_ms < 90000){
        startMs = 0;
      }
      else if (nowPlaying.item.duration_ms <60000) {
        startMs = 0;
        durationMs = nowPlaying.item.duration_ms
      }
    }

    //starting work on seek and skip
    spotifyApi.seek(startMs)
    setTimeout(() => {
      spotifyApi.skipToNext().then((response) => {
      loadCurrentPlayback();
      })
    }, durationMs);
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
