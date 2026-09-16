import React from "react";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import "./GlobalPlayer.css";

function formatTime(t) {
  if (!t || Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    loop,
    expanded,
    setExpanded,
    setLoop,
    togglePlayPause,
    next,
    prev,
    seek,
  } = useMusicPlayer();

  // Nothing loaded yet -> no bar at all, so it never blocks the UI on a
  // fresh visit before anyone has picked a track.
  if (!currentTrack) return null;

  return (
    <div
      className={`global-player ${expanded ? "expanded" : ""}`}
      role="region"
      aria-label="Music player"
    >
      <div className="global-player-bar">
        <img
          src={currentTrack.cover}
          alt=""
          className="global-player-art"
          onClick={() => setExpanded(!expanded)}
        />
        <div
          className="global-player-info"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="global-player-title">{currentTrack.title}</span>
          <span className="global-player-artist">
            {currentTrack.artist || "KneeRose"}
          </span>
        </div>
        <div className="global-player-controls">
          <i
            className="fa-solid fa-backward-step gp-btn"
            onClick={prev}
            role="button"
            tabIndex={0}
            aria-label="Previous track"
          ></i>
          <i
            className={`fa-solid ${
              isPlaying ? "fa-pause" : "fa-play"
            } gp-btn gp-btn-main`}
            onClick={togglePlayPause}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? "Pause" : "Play"}
          ></i>
          <i
            className="fa-solid fa-forward-step gp-btn"
            onClick={next}
            role="button"
            tabIndex={0}
            aria-label="Next track"
          ></i>
        </div>
        <button
          className="gp-expand-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse player" : "Expand player"}
        >
          <i
            className={`fa-solid ${
              expanded ? "fa-chevron-down" : "fa-chevron-up"
            }`}
          ></i>
        </button>
      </div>

      {expanded && (
        <div className="global-player-expanded">
          <img
            src={currentTrack.cover}
            alt=""
            className="gp-expanded-art"
          />
          <h2 className="gp-expanded-title">{currentTrack.title}</h2>
          <p className="gp-expanded-artist">
            {currentTrack.artist || "KneeRose"}
          </p>
          <input
            type="range"
            className="my-slider gp-seek"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <div className="player-times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="gp-expanded-controls">
            <i
              className={`fa-solid fa-arrows-rotate gp-btn ${
                loop ? "gp-active" : ""
              }`}
              onClick={() => setLoop(!loop)}
              role="button"
              tabIndex={0}
              aria-label="Toggle loop"
            ></i>
            <i
              className="fa-solid fa-backward-step gp-btn"
              onClick={prev}
              role="button"
              tabIndex={0}
              aria-label="Previous track"
            ></i>
            <i
              className={`fa-solid ${
                isPlaying ? "fa-pause" : "fa-play"
              } gp-btn gp-btn-main`}
              onClick={togglePlayPause}
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? "Pause" : "Play"}
            ></i>
            <i
              className="fa-solid fa-forward-step gp-btn"
              onClick={next}
              role="button"
              tabIndex={0}
              aria-label="Next track"
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}
