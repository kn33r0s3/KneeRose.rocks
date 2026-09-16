import React from "react";
import "./Music.css";
import tracks from "../data/tracks";
import { useMusicPlayer } from "../context/MusicPlayerContext";

export default function Music() {
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  function playAll() {
    if (tracks.length > 0) playTrack(tracks[0]);
  }

  return (
    <div className="music-page">
      <div className="music-page-content">
        <h1 className="header-title" style={{ margin: "50px auto 5px" }}>
          KneeRusic
        </h1>
        <p className="music-page-sub">
          KneeRose · C1withaCrown Records 🇳🇵 — tap a track to play it, or hit
          Play All to run the whole discography on loop. The player follows
          you across the site and onto your lock screen / media controls.
        </p>

        {tracks.length === 0 ? (
          <p className="music-empty">
            No tracks yet — add some in <code>src/data/tracks.js</code>.
          </p>
        ) : (
          <>
            <button className="kneerose-btn music-play-all" onClick={playAll}>
              <i className="fa-solid fa-repeat" style={{ marginRight: "8px" }}></i>
              Play All (Loop)
            </button>

            <div className="track-grid">
              {tracks.map((track) => {
                const isCurrent =
                  currentTrack && currentTrack.id === track.id;
                return (
                  <div
                    key={track.id}
                    className={`track-card ${
                      isCurrent ? "track-card-active" : ""
                    }`}
                    onClick={() => playTrack(track)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="track-card-art"
                    />
                    <div className="track-card-info">
                      <span className="track-card-title">{track.title}</span>
                      <span className="track-card-artist">
                        {track.artist || "KneeRose"}
                      </span>
                    </div>
                    {track.rapfameUrl && (
                      <a
                        href={track.rapfameUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="track-card-external"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View on Rap Fame"
                        title="View on Rap Fame"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    <i
                      className={`fa-solid ${
                        isCurrent && isPlaying ? "fa-pause" : "fa-play"
                      } track-card-play`}
                      aria-hidden="true"
                    ></i>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
