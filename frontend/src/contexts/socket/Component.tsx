import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import {
  SocketReducer,
  defaultSocketContextState,
  SocketContextProvider,
} from "./Context";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState<boolean>(true);

  const socket = useSocket("http://localhost:3001", {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  });

  useEffect(() => {
    // Connect to the Web Socket
    socket.connect();

    // Save the socket in context
    SocketDispatch({ type: "update_socket", payload: socket });

    // Start the event listeners
    StartListener();

    // Send the handshake
    SendHandshake();
  }, []);

  const StartListener = () => {
    // Reconnect event
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt #" + attempt);
    });
    // Reconnect attempt event
    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection attempt #" + attempt);
    });
    // Reconnect error
    socket.io.on("reconnect_error", (attempt) => {
      console.info("Reconnection error #" + attempt);
    });
    // Reconnect failed
    socket.io.on("reconnect_failed", () => {
      alert("We are unable to connect you to the web socket");
    });
  };
  const SendHandshake = () => {
    console.info("Sending handshake to a server ...");
    socket.emit("handshake", (uid: string, users: string[]) => {
      console.info("User handshake callback message received");
      SocketDispatch({ type: "update_uid", payload: uid });
      SocketDispatch({ type: "update_user", payload: uid });

      setLoading(false);
    });
  };

  if (loading) {
    return <p>Loading socket IO ....</p>;
  }

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
