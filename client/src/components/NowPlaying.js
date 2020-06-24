import React, { Component, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const NowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState()
    const spotifyWebApi = new SpotifyWebApi()
    const getNowPlaying = () => {
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            setNowPlaying(response.item)
          });
        
        }

    return (
        <div>
            <h1>Now Playing</h1>
            <div>
                <img src= {nowPlaying ? nowPlaying.album.images[0].url : ""} style={{height: 250}} />
            </div>
            <button onClick={() => getNowPlaying()}>
                Get Current Song
            </button>
            <div>
                Now Playing: {nowPlaying ? nowPlaying.name : "No Song Playing"}
            </div>
            <div>
                {nowPlaying ? `By: ${nowPlaying.artists.map(artist => artist.name + " ")}` : ""}
            </div>
        </div>
      )

}

export default NowPlaying