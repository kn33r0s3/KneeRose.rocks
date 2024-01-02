const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const PORT = 8000;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const { YouTube } = require("popyt");

const app = express();

// CORS configuration
//
const corsOptions = {
  origin: "https://kneerose.rocks",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: "true",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
//
//

function fixLength(len) {
  if (len === 0) return "";
  if (len < 10) return `0${len}:`;
  return len;
}

app.get("/", (req, res) => {
  res.send("THIS IS THE BACKEND TO KNEE ROSE");
});

app.get("/getsong", async (req, res) => {
  try {
    const youTube = new YouTube("AIzaSyAStVZQT5LnJOl5V1wapnQzVAXbca56ILs");
    const video = await youTube.getVideo(req.query.title);
    console.log(video);
    let length =
      fixLength(video._length.hours) +
      fixLength(video._length.minutes) +
      fixLength(video._length.seconds);
    res.json({
      songInfo: {
        title: `${video.title}`,
        artist: `${video.channel.name}`,
        url: `${video.url}`,
        thumbnail: `${video.thumbnails.standard.url}`,
        length: `${length}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/play", async (req, res) => {
  const videoUrl = req.query.url;

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });
    const audioDuration = info.videoDetails.lengthSeconds;

    res.header({
      "Content-Type": "audio/mp3",
      "Cache-Control": "no-cache",
      "X-Audio-Duration": audioDuration,
    });

    const proc = ffmpeg(ytdl(videoUrl, { format: format })).format("mp3");

    proc.pipe(res);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("An error occurred");
  }
});

app.get("/meme", async (req, res) => {
  const { getRandomMeme } = require("@blad3mak3r/reddit-memes");

  var subreddits = [
    "horny",
    "skinnytail",
    "nudes",
    "nudesfeed",
    "nsfwcosplay",
    "legalteens",
    "cumsluts",
    "PetiteGoneWild",
    "GirlsFinishingTheJob",
    "nepaligonewild",
  ];
  var memereddits = [
    "absolutelynotanimeirl",
    "anime_irl",
    "animenocontext",
    "goodanimemes",
    "goodanimememes",
    "Animemes",
    "holesome",
    "comedyhomicide",
    "shitposting",
    "196",
    "comedyheaven",
    "bonehurtingjuice",
    "bonehurtingjuice",
    "nukedmemes",
    "raimimemes",
    "lastimages",
    "okbuddyretard",
    "memes",
    "dankmemes",
    "wholesomememes",
    "me_irl",
    "funny",
    "PrequelMemes",
    "Animemes",
    "surrealmemes",
    "blackpeopletwitter",
    "WhitePeopleTwitter",
    "ComedyCemetery",
    "terriblefacebookmemes",
    "BikiniBottomTwitter",
    "gamingmemes",
    "ProgrammerHumor",
    "HistoryMemes",
    "2meirl4meirl",
    "PoliticalHumor",
  ];

  var randomSubreddit =
    memereddits[Math.floor(Math.random() * memereddits.length)];
  try {
    var data = await getRandomMeme(randomSubreddit);

    res.send({ image: `${data.image}` });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
