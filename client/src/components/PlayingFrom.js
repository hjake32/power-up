import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const PlayingFrom = (props) => {
  const spotifyApi = new SpotifyWebApi();
  const playingFrom = props.playback;
  const userId = props.userId;
  const [playListId, setPlayListId] = useState();
  const [playListDetails, setPlayListDetails] = useState();
  const [nextTracks, setNextTracks] = useState();

  useEffect(() => {
    getPlayListId();
    getPlaybackDetails();
    getTracks();
  }, [playingFrom, userId, playListId]);

  const getPlaybackDetails = () => {
    if (playingFrom) {
      if (playingFrom.context.type === "playlist") {
        spotifyApi.getPlaylist(playListId).then((response) => {
          setPlayListDetails(response);
        });
      } else {
        spotifyApi.getAlbum(playListId).then((response) => {
          setPlayListDetails(response)
        });
      }
    }
  };

  const getPlayListId = () => {
    //Trim to get playlist id
    if (playingFrom) {
      setPlayListId(
        playingFrom.context ? playingFrom.context.uri.toString().slice(-22) : ""
      );
    }
  };

  const getTracks = () => {
    if (playListDetails) {
      //Get list of all tracks in album
      var tracks = playListDetails.tracks.items.map((item) => {
        //If item.track is true, then playback is from playlist and we must parse the object accordingly
        return item.track ? item.track.name : item.name
      });
      //Get index of currently playing song. Slice array at index+1 to get array of up next tracks
      var indexOfPlaying = tracks.indexOf(playingFrom.item.name);
      var slicedTracks = tracks.slice(indexOfPlaying + 1);
      //Set nextTracks
      setNextTracks(
        slicedTracks.map((trackName) => {
          return <li key={trackName}>{trackName}</li>;
        })
      );
    }
  };

  return (
    <div>
      <h3>
        <a href={playingFrom.context ? playingFrom.context.uri : ""}>
          Playing From {playListDetails ? playListDetails.name : ""}
        </a>
      </h3>
      <h4>Queue</h4>
      <ul className="queue">{nextTracks}</ul>
    </div>
  );
};

export default PlayingFrom;
