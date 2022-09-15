import { useState } from "react";
import MultiPlayerGame from "../../components/multiPlayerGame/MultiPlayerGame";
import WaitingRoom from "../../components/waitingRoom/WaitingRoom";
import "./MultiPlayer.scss";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const MultiPlayer = () => {
  const [showGame, setShowGame] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");

  return (
    <>
      <WaitingRoom
        showGame={showGame}
        setShowGame={setShowGame}
        socket={socket}
        room={room}
        setRoom={setRoom}
      ></WaitingRoom>

      {showGame ? (
        <MultiPlayerGame socket={socket} room={room}></MultiPlayerGame>
      ) : null}
    </>
  );
};

export default MultiPlayer;
