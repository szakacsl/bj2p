import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Game from "./Pages/SinglePlayer/SinglePlayer";
import HeaderBar from "./Pages/HeaderBar/HeaderBar";
import Exercise from "./Pages/Exercise";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="game" element={<Game />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
