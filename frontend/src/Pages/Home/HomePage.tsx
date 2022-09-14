import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <nav className="homepage">
      <div className="homepage__button">
        <Divider />
        <Link to={"/game"}>
          <Button positive>Single Player</Button>
        </Link>
        <Link to={"/waiting-room"}>
          <Button negative>Multi Player</Button>
        </Link>
        <Divider />
      </div>
    </nav>
  );
};

export default HomePage;
