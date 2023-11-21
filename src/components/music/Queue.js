import React from "react";
import QueueItem from "./QueueItem";

export default function Queue(props) {
  const { songs, setSongs, play } = props;

  function removeSong(e) {
    let newsongs = songs;
    setSongs(() => {
      return newsongs.filter((s) => s.url !== e.target.id);
    });
  }
  return (
    <div className="queue-container">
      {" "}
      <h1
        style={{
          fontSize: "1.9em",
          margin: "10px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Your Queue
      </h1>{" "}
      {songs.map((song) => {
        return (
          <QueueItem
            song={song}
            songs={songs}
            removeSong={removeSong}
            play={play}
          />
        );
      })}
    </div>
  );
}
