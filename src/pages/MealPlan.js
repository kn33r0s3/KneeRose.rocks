import React, { useEffect, useState } from "react";
import "./MealPlan.css";
export default function MealPlan() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [choice, setChoice] = useState("");
  const [err, setErr] = useState("");

  function setter(e) {
    e.preventDefault();
    if (item !== "") {
      setErr("");
      setItems((items) => {
        return [...items, item];
      });
      setItem("");
    } else setErr("Please input an item first!");
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

  function getImages() {}

  function picker() {
    let num = Math.floor(Math.random() * items.length);
    setChoice(items[num]);
    console.log(choice, num);
  }

  function remove(item) {
    if (items.length === 1) {
      setChoice("");
    }
    setItems((items) => {
      return items.filter((i) => i !== item);
    });
    console.log("items", items);
  }

  function Btn() {
    if (items.length > 1) {
      return (
        <div className="m-auto">
          <button
            className="kneerose-btn"
            style={{
              fontSize: "1em",
            }}
            onClick={picker}
          >
            Pick Random
          </button>
          <button
            className="kneerose-btn"
            style={{
              backgroundColor: "darkred",
              color: "white",
              fontSize: "1em",
            }}
            onClick={() => {
              setItems([]);
              setChoice("");
            }}
          >
            Clear All
          </button>
        </div>
      );
    }
  }

  useEffect(() => {
    console.log("items", items, "error", err);
  }, [items, choice, err]);

  return (
    <div className="meal-plan-project">
      <form className="meal-plan-form" onSubmit={(e) => setter(e)}>
        <h1 style={{ color: "white", margin: "5px" }}>Meal Plan</h1>
        <Err />
        <input
          className="input-bar"
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        ></input>
        <button className="kneerose-btn" type="submit">
          Add Item
        </button>
      </form>
      {items.length > 0 && (
        <div className="meal-plan-container">
          <div className="meal-items">
            {getImages &&
              items.map((item) => (
                <div className="meal-item">
                  <h3>{item}</h3>
                  <button
                    className="kneerose-btn-two"
                    style={{ fontSize: "0.9em" }}
                    onClick={(e) => remove(item)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <label htmlFor="pick" className="choice">
            <h3>{choice}</h3>
          </label>
        </div>
      )}
      <Btn />
    </div>
  );
}
