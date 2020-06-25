import React, { Component, useState, useEffect } from "react";
import "./App.css";
import PlayingFrom from "./components/PlayingFrom";
import NowPlaying from "./components/NowPlaying";
import SpotifyWebApi from "spotify-web-api-js";
import Banner from "react-banner";
import "react-banner/dist/style.css";

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
      <Banner
        logo="My Logo"
        url={window.location.pathname}
        items={[
          { content: "Login", url: "http://localhost:8888" },
          { content: "Another", url: "/another" },
        ]}
      />
      <button onClick={() => loadCurrentPlayback()}>Get Current Song</button>
      <NowPlaying playback={nowPlaying ? nowPlaying.item : ""} />
      <PlayingFrom
        playback={nowPlaying ? nowPlaying.context.uri : ""}
        userId={userId}
      />
    </div>
  );
};

export default App;
