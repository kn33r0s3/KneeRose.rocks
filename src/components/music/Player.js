import React, { useEffect, useState, useRef } from "react";
import NowPlaying from "./NowPlaying";

export default function Player(props) {
  const {
    play,
    audioUrl,
    isPlaying,
    setIsPlaying,
    songs,
    currentSong,
    loop,
    setLoop,
  } = props;
  const [currentTime, setCurrentTime] = useState(0);
  const [playSong, setPlaySong] = useState("");
  const [duration, setDuration] = useState("...");
  const audioRef = useRef();

  function handleLoop(e) {
    e.target.focus();
    if (loop) {
      setLoop(false);
    } else {
      setLoop(true);
    }
  }
  function handlePlayPause(e) {
    e.target.focus();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Paused");
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      console.log("Played");
    }
  }

  const onLoadedMetadata = () => {
    var url = `https://www.api.kneerose.rocks${audioUrl}`;
    console.log(url);
    fetch(url, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const audioDuration = parseFloat(
        response.headers.get("X-Audio-Duration")
      );
      console.log("Duration fetched", audioDuration);
      setDuration(audioDuration);
    });
    audioRef.current.addEventListener("ended", () => {
      console.log("ended");
      if (songs.length > 0) {
        play(songs[0]);
      }
    });
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    fetch(`https://www.api.kneerose.rocks${audioUrl}`, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const audioSrc = URL.createObjectURL(blob);
        setPlaySong(() => audioSrc);
      })
      .catch((error) => console.error("Error fetching audio:", error));
  }, [currentSong]);

  return (
    <div className="player">
      <audio
        onLoadedMetadata={onLoadedMetadata}
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        src={playSong}
        crossOrigin="anonymous"
        type="audio/mp3"
        autoPlay="autoplay"
      />
      <NowPlaying
        song={currentSong}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
        onSeek={onSeek}
        handleLoop={handleLoop}
      />
    </div>
  );
}
