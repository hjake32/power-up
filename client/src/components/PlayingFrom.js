import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const PlayingFrom = (props) => {
  const spotifyApi = new SpotifyWebApi();
  const playingFrom = props.playback;
  const userId = props.userId;
  const [playListId, setPlayListId] = useState();
  const [playListDetails, setPlayListDetails] = useState();

  useEffect(() => {
    getPlayListId()
    getPlaylistDetails()
  }, [playingFrom, userId, playListId, playListDetails])

  const getPlaylistDetails = () => {
    spotifyApi.getPlaylist(userId, playListId).then((response) => {
      setPlayListDetails(response);
      console.log(playListDetails);
    });
  };

  const getPlayListId = () => {
    //Trim to get playlist id
    if (playingFrom){
      setPlayListId(playingFrom ? playingFrom.toString().slice(-22) : "");
      console.log(playListId)
    }
  };

  return (
    <div>
      <h3>
        <a href={playingFrom}>
          Playing From {playListDetails ? playListDetails.name : ""}
        </a>
      </h3>
      <li></li>
    </div>
  );
};

export default PlayingFrom;
