import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Input, Segment } from "semantic-ui-react";
import Dealer from "../../Components/Dealer/Dealer";
import Player from "../../Components/Player/Player";
import IDealerData, { NewIDealerData } from "../../data/Dealer/DealerData";
import IPlayerData, { NewIPlayerData } from "../../data/Player/PlayerData";
import {
  checkCardsAreLosing,
  checkFirstCardsWins,
  checkGetNewCard,
  resetDealer,
  resetGame,
  setDealerForGame,
  setPlayerForGame,
  setPlayerLost,
  setPlayerWon,
} from "../../util/gameState";
import getGeneratedCardNumbers from "../../util/randomCard";
import "./Game.scss";

const Game = () => {
  const [player, setPlayer] = useState<IPlayerData>(NewIPlayerData);
  const [dealer, setDealer] = useState<IDealerData>(NewIDealerData);
  const [input, setInput] = useState<string>("");
  const [finalCardCheck, setFinalCardCheck] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(2);

  const handleClickAddMoneyButton = () => {
    const moneyToAdd = Number.parseInt(input);
    if (moneyToAdd <= player.money) {
      setPlayerForGame(player, setPlayer, moneyToAdd);
      setDealerForGame(dealer, setDealer);
    }
  };

  const handleClickHitButton = () => {
    const generatedNewCard = getGeneratedCardNumbers();
    setPlayer({ ...player, cards: player.cards + generatedNewCard });
  };

  const handleClickStandButton = () => {
    let dealerCards = dealer.cards;
    while (checkGetNewCard(dealerCards)) {
      dealerCards += getGeneratedCardNumbers();
    }
    setDealer({ ...dealer, cards: dealerCards });
    setFinalCardCheck(true);
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    const result = event.target.value.replace(/[^0-9]/g, "");
    setInput(result);
  };

  useEffect(() => {
    if (checkCardsAreLosing(player.cards)) {
      setTurn(turn - 1);
      setFinalCardCheck(false);
      resetDealer(dealer, setDealer);
      setPlayerLost(player, setPlayer);
      alert("YOU LOST THIS ROUND");
    } else {
      if (checkCardsAreLosing(dealer.cards)) {
        setTurn(turn - 1);
        setFinalCardCheck(false);
        resetDealer(dealer, setDealer);
        setPlayerWon(player, setPlayer);
        alert("YOU WON THIS ROUND");
      } else {
        if (finalCardCheck) {
          setFinalCardCheck(false);
          setTurn(turn - 1);
          checkFirstCardsWins(player, setPlayer, dealer, setDealer);
        }
        if (turn === 0) {
          resetGame(player, setPlayer, dealer, setDealer, setTurn);
          alert("END OF THE GAME");
          window.history.pushState(null, "New Page Title", "/");
          window.location.reload();
        }
      }
    }
  }, [player, dealer, finalCardCheck, turn]);

  return (
    <div className="game__window">
      <div className="game__area">
        <Grid divided>
          <Grid.Column width={8}>
            <Segment>
              <div className="game__block">
                <Dealer dealer={dealer}></Dealer>
              </div>
            </Segment>

            <Segment>
              <div className="game__block">
                <Player player={player}></Player>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div className="game__block">
                <br></br>
                <Grid.Row>
                  <Button
                    disabled={player.bet > 0 ? false : true}
                    icon
                    labelPosition="left"
                    onClick={handleClickStandButton}
                  >
                    Stand
                    <Icon name="hand paper outline" />
                  </Button>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Button
                    disabled={player.bet > 0 ? false : true}
                    icon
                    labelPosition="left"
                    onClick={handleClickHitButton}
                  >
                    Hit
                    <Icon name="plus square outline" />
                  </Button>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Button
                    disabled={player.bet > 0 ? true : false}
                    icon
                    labelPosition="left"
                    onClick={handleClickAddMoneyButton}
                  >
                    Add money
                    <Icon name="money bill alternate outline" />
                  </Button>
                  <br></br> <br></br>
                  <Input
                    placeholder="Money"
                    value={input}
                    onChange={handleInputChange}
                  />
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
                <Player player={player}></Player>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Game;
