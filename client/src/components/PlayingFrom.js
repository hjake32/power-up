import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const PlayingFrom = (props) => {
  const spotifyApi = new SpotifyWebApi();
  const playingFrom = props.playback;
  const userId = props.userId;
  const [playListId, setPlayListId] = useState();
  const [playListDetails, setPlayListDetails] = useState();

  const getPlaylistDetails = () => {
    spotifyApi.getPlaylist(userId, playListId).then((response) => {
      setPlayListDetails(response);
      console.log(playListDetails);
    });
  };

  const getPlayListId = () => {
    //Trim to get playlist id
    setPlayListId(playingFrom ? "37i9dQZF1CAqeoLqOvvBsv" : "");
    console.log(playListId);
  };

  console.log(typeof playingFrom);
  if (playingFrom) {
    setPlayListId(playingFrom.substring(0, 22))
    getPlaylistDetails();
  }

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
