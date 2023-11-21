import React from "react";

export default function QueueItem(props) {
  const { song, removeSong, play } = props;

  return (
    <div className="music-queue">
      <div className="queue-item">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="queue-image"
        ></img>
        <div className="queue-song-desc">
          <span className="queue-song-title">{song.title}</span>
          <span className="queue-song-length">{song.length}</span>
        </div>
        <div
          className="queue-song-btns"
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "auto",
          }}
        >
          <button className="kneerose-btn">
            <i className="fa-solid fa-play" onClick={() => play(song)}></i>
          </button>
          <button
            id={song.url}
            onClick={removeSong}
            className="kneerose-btn"
            style={{
              backgroundColor: "darkred",
              color: "white",
            }}
          >
            <i id={song.url} className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
