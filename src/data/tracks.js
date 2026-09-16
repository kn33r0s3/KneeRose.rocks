// Real KneeRose tracks — titles, artist, and cover art sourced from
// https://rapfame.app/user/kneerose (fetched 2026-09-16). Audio files were
// supplied directly by the artist (self-uploaded), which is exactly the
// "you own the rights" case this data file is meant for.
//
// Cover art is currently hotlinked from RapFame's CDN (the same image
// already publicly shown on each track's RapFame page) because this build
// environment had no way to download the binary image files locally.
// Recommended follow-up: save each cover as a local file under
// src/resources/music/ and swap the `cover` value to a local import, so the
// site doesn't depend on RapFame's CDN staying up / allowing hotlinking.
//
// rapfameUrl links out to the original post (plays/comments/community
// feedback live there — not duplicated here).

const tracks = [
  {
    id: "shade-is-dark",
    title: "Shade is Dark",
    artist: "KneeRose",
    cover:
      "https://cdn-us-hot.rapfa.me/track/19343390/4869397e-6187-45d7-ab31-5055a584d778_thumb.jpg",
    src: "/audio/shade-is-dark.mp3",
    rapfameUrl: "https://rapfame.app/tracks/19343390",
  },
  {
    id: "nepali-freeverse",
    title: "Nepali Freeverse (Ek Dui Tin)",
    artist: "KneeRose",
    cover:
      "https://cdn-us-hot.rapfa.me/tracks/10238369/84dde1e7-25ef-4413-ad2b-272a44a776c5_thumb.jpg",
    src: "/audio/nepali-freeverse-ek-dui-tin.mp3",
    rapfameUrl: "https://rapfame.app/tracks/20609417",
  },
  {
    id: "these-days",
    title: "These Days",
    artist: "KneeRose",
    cover:
      "https://cdn-us-hot.rapfa.me/tracks/10238369/0f9dad96-8aad-4ecb-8181-c1d006673a94_thumb.jpg",
    src: "/audio/these-days.mp3",
    rapfameUrl: "https://rapfame.app/tracks/23957839",
  },
  {
    id: "try-ball",
    title: "TryBall",
    artist: "KneeRose",
    cover:
      "https://cdn-us-hot.rapfa.me/track/24028047/3154c986-139b-48b2-87e3-ee102e794a62_thumb.jpg",
    src: "/audio/try-ball.mp3",
    rapfameUrl: "https://rapfame.app/tracks/24028047",
  },
  {
    id: "summit",
    title: "Summit (RIP YamaBuddha)",
    artist: "KneeRose",
    cover:
      "https://cdn-us-hot.rapfa.me/track/24057754/b0823bee-4b05-4056-a28f-8623adf6199a_thumb.jpg",
    src: "/audio/summit.mp3",
    rapfameUrl: "https://rapfame.app/tracks/24057754",
  },
];

export default tracks;
