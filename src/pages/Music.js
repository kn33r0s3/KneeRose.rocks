import React, { useState, useEffect } from "react";
import "./Music.css";
import Queue from "../components/music/Queue";
import Player from "../components/music/Player";
export default function Music() {
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState("");
  const [currentSong, setCurrentSong] = useState();
  const [songs, setSongs] = useState([]);
  const [loop, setLoop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [err, setErr] = useState("");

  async function addToQueue() {
    await fetch(`https://api.kneerose.rocks/getsong?title=${title}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!songs.find((song) => song.url === data.songInfo.url)) {
          setErr("");
          setSongs(() => {
            return [...songs, data.songInfo];
          });
        } else {
          setErr("The song was already added to the queue!");
        }
      });
  }

  async function play(song) {
    var url = `/play?url=${song.url}`;
    setAudio(url);
    setPlaying(true);
    let newsongs = songs;
    setSongs(() => {
      return newsongs.filter((s) => s.url !== song.url);
    });
    setCurrentSong(song);
    return;
  }

  function Err() {
    if (err.length > 0) {
      return (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            backgroundColor: "white",
            width: "max-content",
            margin: "auto",
            padding: "3px",
          }}
        >
          {err}
        </p>
      );
    }
  }
  useEffect(() => {}, [songs, err, currentSong]);

  return (
    <div className="music-page">
      <div className="music-page-content">
        <h1 className="header-title" style={{ margin: "50px auto 5px" }}>
          KneeRusic
        </h1>
        <input
          type="text"
          className="input-bar"
          value={title}
          placeholder="Type your song name/info..."
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "5px",
          }}
        ></input>
        <button
          className="kneerose-btn"
          style={{
            padding: "5px",
          }}
          onClick={addToQueue}
        >
          {""}Add To Queue
        </button>
        <Err />
        <div className="player-queue-container">
          {audio.length > 0 && (
            <Player
              songs={songs}
              currentSong={currentSong}
              audioUrl={audio}
              isPlaying={playing}
              setIsPlaying={setPlaying}
              play={play}
              setLoop={setLoop}
              loop={loop}
            />
          )}

          {songs.length > 0 && (
            <Queue songs={songs} setSongs={setSongs} play={play} />
          )}
        </div>
      </div>
    </div>
  );
}
