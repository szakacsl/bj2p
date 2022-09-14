import IDealerData from "../data/Dealer/DealerData";
import IPlayerData from "../data/Player/PlayerData";
import getGeneratedCardNumbers from "./randomCard";

export function checkCardsAreLosing(cards: number) {
  if (cards > 21) {
    return true;
  } else {
    return false;
  }
}

export function checkGetNewCard(cards: number) {
  if (cards < 17) {
    return true;
  } else {
    return false;
  }
}

export function checkFirstCardsWins(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void,
  dealer: IDealerData,
  setDealer: (dealer: IDealerData) => void
) {
  if (player.cards < dealer.cards) {
    resetDealer(dealer, setDealer);
    setPlayerLost(player, setPlayer);
    alert("YOU LOST THIS ROUND func");
  }
  if (player.cards === dealer.cards) {
    resetDealer(dealer, setDealer);
    setPlayerDraw(player, setPlayer);
    alert("YOU DRAW THIS ROUND func");
  }
  if (player.cards > dealer.cards) {
    resetDealer(dealer, setDealer);
    setPlayerWon(player, setPlayer);
    alert("YOU WON THIS ROUND func");
  }
}

export function setPlayerWon(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void
) {
  setPlayer({
    ...player,
    money: player.money + player.bet * 1.5,
    cards: getGeneratedCardNumbers() + getGeneratedCardNumbers(),
    bet: 0,
  });
}

export function setPlayerDraw(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void
) {
  setPlayer({
    ...player,
    money: player.money + player.bet,
    cards: getGeneratedCardNumbers() + getGeneratedCardNumbers(),
    bet: 0,
  });
}

export function setPlayerLost(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void
) {
  setPlayer({
    ...player,
    money: player.money - player.bet,
    cards: getGeneratedCardNumbers() + getGeneratedCardNumbers(),
    bet: 0,
  });
}

export function setPlayerForGame(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void,
  moneyToAdd: number
) {
  setPlayer({
    ...player,
    cards: getGeneratedCardNumbers() + getGeneratedCardNumbers(),
    money: player.money - moneyToAdd,
    bet: moneyToAdd,
  });
}

export function resetPlayer(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void
) {
  setPlayer({
    ...player,
    money: 1000,
    cards: 0,
    bet: 0,
  });
}

export function setDealerForGame(
  dealer: IDealerData,
  setDealer: (dealer: IDealerData) => void
) {
  setDealer({
    ...dealer,
    cards: getGeneratedCardNumbers(),
  });
}

export function resetDealer(
  dealer: IDealerData,
  setDealer: (dealer: IDealerData) => void
) {
  setDealer({
    ...dealer,
    cards: 0,
  });
}

export function resetGame(
  player: IPlayerData,
  setPlayer: (player: IPlayerData) => void,
  dealer: IDealerData,
  setDealer: (dealer: IDealerData) => void,
  setNumber: (number: number) => void
) {
  resetDealer(dealer, setDealer);
  resetPlayer(player, setPlayer);
  setNumber(1);
}
