import React, { Component, useState } from 'react';
import './App.css';
import PlayingFrom from './components/PlayingFrom'
import NowPlaying from './components/NowPlaying'
import SpotifyWebApi from 'spotify-web-api-js';

const App = () => {
  const spotifyApi = new SpotifyWebApi();
  
  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

  return (
    <div>
      <NowPlaying />
      <PlayingFrom name="discover weekly" />
    </div>
    
  )
}

export default App