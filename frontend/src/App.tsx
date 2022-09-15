import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import HeaderBar from "./pages/headerBar/HeaderBar";
import Exercise from "./pages/Exercise";
import SinglePlayer from "./pages/singlePlayer/SinglePlayer";
import MultiPlayer from "./pages/multiPlayer/MultiPlayer";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="singleplayer" element={<SinglePlayer />} />
        <Route path="multiplayer" element={<MultiPlayer />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
