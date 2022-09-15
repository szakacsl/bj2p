import getCardNumbers from "../../util/RandomCard";
import { GameStateEnum } from "./GameStateEnum";

interface IPlayerData {
  name: string;
  cards: number;
  money: number;
  bet: number;
  gameState: GameStateEnum;
}

export const NewIPlayerData: IPlayerData = {
  name: "",
  cards: 0,
  money: 1000,
  bet: 0,
  gameState: GameStateEnum.DRAW,
};

export default IPlayerData;
