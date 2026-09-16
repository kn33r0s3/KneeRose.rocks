import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MusicPlayerContext = createContext(null);

/**
 * Wraps the whole app. Owns ONE <audio> element (via a ref, never unmounted)
 * so playback survives route changes — navigating from /music to /home or
 * /projects does not stop the song, which is the whole point of a "global"
 * player.
 */
export function MusicPlayerProvider({ children, playlist }) {
  const audioRef = useRef(null);
  if (!audioRef.current && typeof Audio !== "undefined") {
    audioRef.current = new Audio();
  }

  const [trackIndex, setTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const currentTrack =
    trackIndex !== null && playlist[trackIndex] ? playlist[trackIndex] : null;

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {
      // Autoplay can be blocked by the browser until the user has
      // interacted with the page at least once — this is expected on
      // first load, not a bug.
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current && audioRef.current.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setTrackIndex((idx) => {
      if (idx === null || playlist.length === 0) return idx;
      return (idx + 1) % playlist.length;
    });
    setIsPlaying(true);
  }, [playlist]);

  const prev = useCallback(() => {
    setTrackIndex((idx) => {
      if (idx === null || playlist.length === 0) return idx;
      return (idx - 1 + playlist.length) % playlist.length;
    });
    setIsPlaying(true);
  }, [playlist]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  }, []);

  const playTrack = useCallback(
    (trackOrId) => {
      const id = typeof trackOrId === "string" ? trackOrId : trackOrId.id;
      const idx = playlist.findIndex((t) => t.id === id);
      if (idx === -1) return;

      if (idx === trackIndex) {
        togglePlayPause();
        return;
      }
      setTrackIndex(idx);
      setIsPlaying(true);
    },
    [playlist, trackIndex, togglePlayPause]
  );

  // Load a new source whenever the selected track changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;
    audio.load();
    setCurrentTime(0);

    if (isPlaying) {
      play();
    }

    if ("mediaSession" in navigator && typeof MediaMetadata !== "undefined") {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist || "KneeRose",
        album: currentTrack.album || "KneeRose.rocks",
        artwork: currentTrack.cover
          ? [
              { src: currentTrack.cover, sizes: "96x96", type: "image/png" },
              { src: currentTrack.cover, sizes: "512x512", type: "image/png" },
            ]
          : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Wire up native <audio> events -> React state.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (!audio.loop) next();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [next]);

  // Media Session action handlers: this is what makes play/pause/skip show
  // up on the lock screen, in the OS notification shade, and work with
  // hardware/bluetooth media keys — while the tab is open (foreground or
  // backgrounded). A browser tab that's fully closed still stops playback;
  // true closed-app background audio needs a native app / PWA service
  // worker, which is out of scope for a static site.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("previoustrack", prev);
    navigator.mediaSession.setActionHandler("nexttrack", next);
    try {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details && typeof details.seekTime === "number") {
          seek(details.seekTime);
        }
      });
    } catch (e) {
      // seekto isn't supported in every browser — safe to ignore.
    }
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [play, pause, prev, next, seek]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  // Reserve space at the bottom of every page for the fixed mini player,
  // only while something is actually loaded.
  useEffect(() => {
    document.body.classList.toggle("kr-player-open", !!currentTrack);
  }, [currentTrack]);

  const value = {
    playlist,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    loop,
    expanded,
    setExpanded,
    setVolume,
    setLoop,
    playTrack,
    togglePlayPause,
    next,
    prev,
    seek,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used inside a MusicPlayerProvider");
  }
  return ctx;
}
