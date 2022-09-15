import React, { useEffect } from "react";
import { Button, Divider, Input } from "semantic-ui-react";
import { Socket } from "socket.io-client";
import { generateRoomKey } from "../../util/GenerateRoomKey";

import "./WaitingRoom.scss";

interface IWaitingRoomProps {
  showGame: boolean;
  setShowGame: (value: boolean) => void;
  socket: Socket;
  room: string;
  setRoom: (value: string) => void;
}

const WaitingRoom: React.FC<IWaitingRoomProps> = (props: IWaitingRoomProps) => {
  const { socket, showGame, setShowGame, room, setRoom } = props;

  const handleOnClickCreateRoom = () => {
    setRoom(generateRoomKey());
    joinRoom();
    setShowGame(true);
  };
  const handleOnClickJoinRoom = () => {
    joinRoom();
    setShowGame(true);
  };

  const joinRoom = () => {
    // const room = generateRoomKey();
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleInputOnChange = (event: { target: { value: string } }) => {
    setRoom(event.target.value);
  };

  useEffect(() => {
    if (showGame === true) {
      joinRoom();
    }
    // console.log(room);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return (
    <nav className="waitingroom">
      <div className="waitingroom__button">
        <Divider />
        {!showGame ? (
          <>
            <Button positive onClick={handleOnClickCreateRoom}>
              Create room
            </Button>
            <Button negative onClick={handleOnClickJoinRoom}>
              Join
            </Button>
            <Input
              placeholder="Enter room name"
              value={room}
              onChange={handleInputOnChange}
            ></Input>
          </>
        ) : null}
        {showGame ? (
          <>
            <h2>Room number: {room}</h2>
          </>
        ) : null}
        <Divider />
      </div>
    </nav>
  );
};

export default WaitingRoom;
