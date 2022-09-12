import { Link } from "react-router-dom";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import Dealer from "../../Components/Dealer/Dealer";
import Player from "../../Components/Player/Player";
import "./Game.scss";

const Game = () => {
  return (
    <div className="game__window">
      <div className="game__area">
        <Grid divided>
          <Grid.Column width={8}>
            <Segment>
              <div className="game__block">
                <Dealer></Dealer>
              </div>
            </Segment>

            <Segment>
              <div className="game__block">
                <Player></Player>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div className="game__block">
                <br></br>
                <br></br>
                <Grid.Row>
                  <Button icon labelPosition="left">
                    Stand
                    <Icon name="hand paper outline" />
                  </Button>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Button icon labelPosition="left">
                    Hit
                    <Icon name="plus square outline" />
                  </Button>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Button icon labelPosition="left">
                    Add money
                    <Icon name="money bill alternate outline" />
                  </Button>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Link to="/">
                    <Button>Quit</Button>
                  </Link>
                </Grid.Row>
              </div>
            </Segment>
            <Segment>
              <div className="game__block">
                <Player></Player>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Game;
