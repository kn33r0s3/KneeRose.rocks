// import React, { useEffect, useState, useRef } from "react";
// import NowPlaying from "./NowPlaying";

// export default function Player(props) {
//   const {
//     play,
//     audioUrl,
//     isPlaying,
//     setIsPlaying,
//     songs,
//     currentSong,
//     loop,
//     setLoop,
//   } = props;
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState("...");
//   const audioRef = useRef();

//   function handleLoop(e) {
//     e.target.focus();
//     if (loop) {
//       setLoop(false);
//     } else {
//       setLoop(true);
//     }
//   }
//   function handlePlayPause(e) {
//     e.target.focus();
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//       console.log("Paused");
//     } else {
//       audioRef.current.play();
//       setIsPlaying(true);
//       console.log("Played");
//     }
//   }

//   const onLoadedMetadata = () => {
//     var url = `https://www.api.kneerose.rocks${audioUrl}`;
//     console.log(url);
//     fetch(url, {
//       mode: "cors",
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((response) => {
//       const audioDuration = parseFloat(
//         response.headers.get("X-Audio-Duration")
//       );
//       console.log("Duration fetched", audioDuration);
//       setDuration(audioDuration);
//     });
//     audioRef.current.addEventListener("ended", () => {
//       console.log("ended");
//       if (songs.length > 0) {
//         play(songs[0]);
//       }
//     });
//   };

//   const onTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const onSeek = (e) => {
//     const seekTime = e.target.value;
//     audioRef.current.currentTime = seekTime;
//     setCurrentTime(seekTime);
//   };

//   useEffect(() => {}, [isPlaying, currentSong]);
//   return (
//     <div className="player">
//       <audio
//         ref={audioRef}
//         onLoadedMetadata={onLoadedMetadata}
//         onTimeUpdate={onTimeUpdate}
//         src={`https://www.api.kneerose.rocks${audioUrl}`}
//         crossOrigin="anonymous"
//         type="audio/mp3"
//         autoPlay="autoplay"
//       />
//       <NowPlaying
//         song={currentSong}
//         handlePlayPause={handlePlayPause}
//         isPlaying={isPlaying}
//         duration={duration}
//         currentTime={currentTime}
//         onSeek={onSeek}
//         handleLoop={handleLoop}
//       />
//     </div>
//   );
// }

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
  const [duration, setDuration] = useState("...");
  const [audioData, setAudioData] = useState(null); // New state for audio data
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
    // Fetch audio data
    fetch(`https://www.api.kneerose.rocks${audioUrl}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        setAudioData(data);
        // Get duration from headers if needed
        const audioDuration = parseFloat(
          response.headers.get("X-Audio-Duration")
        );
        console.log("Duration fetched", audioDuration);
        setDuration(audioDuration);
      });
  }, [audioUrl]);

  useEffect(() => {
    // Set audio source when audioData is available
    if (audioData) {
      const blob = new Blob([audioData], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(blob);
      audioRef.current.src = audioUrl;
      onLoadedMetadata();
    }
  }, [audioData]);

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
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
