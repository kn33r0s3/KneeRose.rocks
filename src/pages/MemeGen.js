import React, { useEffect, useState } from "react";
import { fetch } from "whatwg-fetch";
import "./MemeGen.css";
export default function MemeGen() {
  const [meme, setMeme] = useState({});
  const [memes, setMemes] = useState([]);
  function like() {
    if (!memes.includes(meme)) {
      setMemes(() => {
        return [...memes, meme];
      });
    } else {
      console.log("already liked");
    }
  }
  function unlike(e) {
    let newmemes = memes;
    setMemes(() => {
      return newmemes.filter((item) => item.id !== e.target.id);
    });
  }

  function clear() {
    setMemes([]);
  }
  useEffect(() => {}, [memes]);
  function getMeme() {
    fetch("https://api.kneerose.rocks/meme", {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "https://www.kneerose.rocks",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeme({
          id: `${Date.now()}`,
          image: data.image,
        });
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      {!meme.image && getMeme()}

      <div className="meme-generator">
        <h1
          className="project-title"
          style={{ fontSize: "2.5em", margin: "15px auto" }}
        >
          Meme Generator
        </h1>
        <div className="meme-container">
          <img src={meme.image} className="meme-image" alt=""></img>
        </div>
        <button
          onClick={like}
          className="kneerose-btn-two"
          style={{
            width: "48%",
            margin: "5px auto",
            backgroundColor: "white",
            color: "red",
          }}
        >
          Add to Liked{" "}
          <i
            className="fa-solid fa-heart fa-lg"
            style={{ color: "#ff006f" }}
          ></i>
        </button>
        <button
          onClick={getMeme}
          className="kneerose-btn"
          style={{ width: "48%", margin: "0 auto 10px auto" }}
        >
          Generate New
        </button>
      </div>

      {/*  */}
      {memes.length > 0 && (
        <>
          <h1
            className="project-title"
            style={{ color: "pink", fontSize: "2.5em", margin: "15px auto" }}
          >
            Liked Memes
          </h1>
          <div className="memes-container">
            {memes.map((m) => {
              return (
                <div className="liked-meme-container">
                  <img
                    src={m.image}
                    className="liked-meme-image"
                    alt="liked"
                  ></img>
                  <button
                    onClick={unlike}
                    id={m.id}
                    className="kneerose-btn-two"
                    style={{
                      width: "48%",
                      margin: "auto",
                      backgroundColor: "white",
                      color: "red",
                    }}
                  >
                    Unlike{" "}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {memes.length > 1 && (
        <button
          onClick={clear}
          className="kneerose-btn-two"
          style={{
            width: "40%",
            margin: "15px auto",
            backgroundColor: "darkred",
            color: "white",
          }}
        >
          Clear All{" "}
        </button>
      )}
    </>
  );
}
