import React, { Component, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const NowPlaying = (props) => {
    const nowPlaying = props.playback

    return (
        <div>
            <h1>Now Playing</h1>
            <div>
                <img src= {nowPlaying ? nowPlaying.album.images[0].url : ""} style={{height: 250}} />
            </div>
            <div className="songTitle">
                {nowPlaying ? nowPlaying.name : "No Song Playing"}
            </div>
            <div>
                {nowPlaying ? `${nowPlaying.artists.map(artist => artist.name)}` : ""}
            </div>
        </div>
      )

}

export default NowPlaying