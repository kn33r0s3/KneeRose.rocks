import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./partials/Partials.css";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import MealPlan from "./pages/MealPlan";
import MemeGen from "./pages/MemeGen";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import GlobalPlayer from "./components/music/GlobalPlayer";
import tracks from "./data/tracks";

function App() {
  return (
    <MusicPlayerProvider playlist={tracks}>
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="projects" element={<Projects />}></Route>
            <Route path="music" element={<Music />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="projects/meal-planner" element={<MealPlan />}></Route>
            <Route path="projects/meme-generator" element={<MemeGen />}></Route>
          </Routes>
          <Footer />
          <GlobalPlayer />
        </Router>
      </div>
    </MusicPlayerProvider>
  );
}
export default App;
