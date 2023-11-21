import React, { useEffect } from "react";

export default function NowPlaying(props) {
  const {
    song,
    handlePlayPause,
    isPlaying,
    duration,
    currentTime,
    onSeek,
    handleLoop,
  } = props;
  function calculateCurrentValue(currentTime) {
    var current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time =
        (current_minute < 10 ? "0" + current_minute : current_minute) +
        ":" +
        (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
  }

  useEffect(() => {}, [isPlaying, song]);

  return (
    <div className="now-playing-container">
      {handlePlayPause && (
        <div className="now-playing-content ">
          <img
            src={song.thumbnail}
            alt="song img"
            className="now-playing-image"
          ></img>
          <div className="now-playing-text">
            <p className="now-playing-title">{song.title}</p>
            <p
              className="now-playing-artist"
              style={{
                color: "wheat",
                fontSize: "1em",

                padding: "0.3em",
              }}
            >
              {song.artist}
            </p>
          </div>
          <div>
            <input
              type="range"
              className="my-slider"
              min={0}
              max={duration}
              value={currentTime}
              onChange={onSeek}
            />
            <div className="player-times">
              <span>{calculateCurrentValue(currentTime)}</span>
              <span>{calculateCurrentValue(duration)}</span>
            </div>
          </div>
          <div className="queue-buttons">
            <i
              className="fa-solid fa-shuffle fa-lg music-additional-btns"
              style={{
                color: "#ffc800",
                maxWidth: "fit-content",
                margin: "0 4px",
              }}
            ></i>
            <div className="now-playing-buttons">
              <i
                className="fa-solid fa-backward-step kneerose-btn-two"
                style={{ maxWidth: "fit-content", margin: "0 4px" }}
              ></i>
              {isPlaying ? (
                <i
                  className="fa-solid fa-pause kneerose-btn"
                  onClick={handlePlayPause}
                  style={{ maxWidth: "fit-content", margin: "0 4px" }}
                >
                  {" "}
                </i>
              ) : (
                <i
                  className="fa-solid fa-play kneerose-btn"
                  onClick={handlePlayPause}
                  style={{ maxWidth: "fit-content", margin: "0 4px" }}
                ></i>
              )}
              <i
                className="fa-solid fa-forward-step kneerose-btn-two"
                style={{ maxWidth: "fit-content", margin: "0 4px" }}
              ></i>
            </div>
            <i
              className="fa-solid fa-arrows-rotate fa-lg music-additional-btns"
              onClick={handleLoop}
              style={{
                color: "#ffc800",
                maxWidth: "fit-content",
                margin: "0 4px",
              }}
            ></i>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
