import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Input, Segment } from "semantic-ui-react";
import Dealer from "../dealer/Dealer";
import Player from "../player/Player";
import IDealerData, { NewIDealerData } from "../../data/dealer/DealerData";
import { GameStateEnum } from "../../data/player/GameStateEnum";
import IPlayerData, {
  NewIOtherPlayerData,
  NewIPlayerData,
} from "../../data/player/PlayerData";
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
import "./MultiPlayerGame.scss";
import { Socket } from "socket.io-client";

interface IMultiPlayerProps {
  socket: Socket;
  room: string;
}

const MultiPlayerGame: React.FC<IMultiPlayerProps> = (
  props: IMultiPlayerProps
) => {
  const { socket, room } = props;
  const [player, setPlayer] = useState<IPlayerData>(NewIPlayerData);
  const [otherPlayer, setOtherPlayer] =
    useState<IPlayerData>(NewIOtherPlayerData);
  const [dealer, setDealer] = useState<IDealerData>(NewIDealerData);
  const [otherDealer, setOtherDealer] = useState<IDealerData>(NewIDealerData);
  const [input, setInput] = useState<string>("");
  const [finalCardCheck, setFinalCardCheck] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(2);
  const [nextRound, setNextRound] = useState<boolean>(false);

  const sendPlayerData = () => {
    socket.emit("send_message", { player, dealer, room });
  };

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
      if (otherDealer.cards === 0) {
        setDealerForGame(dealer, setDealer);
      } else {
        setDealer(otherDealer);
      }
    }
  };

  const handleClickHitButton = () => {
    const generatedNewCard = getGeneratedCardNumbers();
    setPlayer({ ...player, cards: player.cards + generatedNewCard });
  };

  const handleClickStandButton = () => {
    let dealerCards = dealer.cards;
    if (dealerCards === otherDealer.cards) {
      while (checkGetNewCard(dealerCards)) {
        dealerCards += getGeneratedCardNumbers();
      }
      setDealer({ ...dealer, cards: dealerCards });
    } else {
      setDealer(otherDealer);
    }
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
    socket.on("receive_message", (data) => {
      setOtherPlayer(data.player);
      setOtherDealer(data.dealer);
    });
    sendPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, finalCardCheck, turn, socket]);

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
            <Segment>
              <div className="game__block">
                <Player player={otherPlayer}></Player>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default MultiPlayerGame;
