import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Input, Segment } from "semantic-ui-react";
import Dealer from "../../components/dealer/Dealer";
import Player from "../../components/player/Player";
import IDealerData, { NewIDealerData } from "../../data/dealer/DealerData";
import { GameStateEnum } from "../../data/player/GameStateEnum";
import IPlayerData, { NewIPlayerData } from "../../data/player/PlayerData";
import {
  checkCardsAreLosing,
  checkGetNewCard,
  checkWinner,
  resetDealer,
  resetGame,
  setDealerForGame,
  setPlayerDraw,
  setPlayerForGame,
  setPlayerLost,
  setPlayerWon,
} from "../../util/GameState";
import getGeneratedCardNumbers from "../../util/RandomCard";
import "./SinglePlayer.scss";

const SinglePlayer = () => {
  const [player, setPlayer] = useState<IPlayerData>(NewIPlayerData);
  const [dealer, setDealer] = useState<IDealerData>(NewIDealerData);
  const [input, setInput] = useState<string>("");
  const [finalCardCheck, setFinalCardCheck] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(2);
  const [nextRound, setNextRound] = useState<boolean>(false);

  const handleClickNextRoundButton = () => {
    setNextRound(false);
    resetDealer(dealer, setDealer);
    switch (player.gameState) {
      case GameStateEnum.WIN:
        return setPlayerWon(player, setPlayer);
      case GameStateEnum.DRAW:
        return setPlayerDraw(player, setPlayer);
      case GameStateEnum.LOOSE:
        return setPlayerLost(player, setPlayer);
    }
  };

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
    if (!nextRound) {
      if (checkCardsAreLosing(player.cards)) {
        setTurn(turn - 1);
        setFinalCardCheck(false);
        setPlayer({ ...player, gameState: GameStateEnum.LOOSE });
        setNextRound(true);
      } else {
        if (checkCardsAreLosing(dealer.cards)) {
          setTurn(turn - 1);
          setFinalCardCheck(false);
          setPlayer({ ...player, gameState: GameStateEnum.WIN });
          setNextRound(true);
        } else {
          if (finalCardCheck) {
            setFinalCardCheck(false);
            setTurn(turn - 1);
            checkWinner(player, setPlayer, dealer, setDealer);
            setNextRound(true);
          }
          if (turn === 0) {
            resetGame(player, setPlayer, dealer, setDealer, setTurn);
            window.history.pushState(null, "New Page Title", "/");
            window.location.reload();
            alert("GAME OVER");
          }
        }
      }
    }
  }, [player, dealer, finalCardCheck, turn, nextRound]);

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
                <Grid.Row>
                  <Button
                    disabled={nextRound ? false : true}
                    icon
                    labelPosition="left"
                    onClick={handleClickNextRoundButton}
                  >
                    Next round
                    <Icon name="angle double right" />
                  </Button>
                </Grid.Row>
                <Grid.Row>
                  <Button
                    disabled={player.bet > 0 && !nextRound ? false : true}
                    icon
                    labelPosition="left"
                    onClick={handleClickStandButton}
                  >
                    Stand
                    <Icon name="hand paper outline" />
                  </Button>
                </Grid.Row>
                <Grid.Row>
                  <Button
                    disabled={player.bet > 0 && !nextRound ? false : true}
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
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default SinglePlayer;
