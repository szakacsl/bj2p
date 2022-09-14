import getCardNumbers from "../../util/randomCard";

interface IPlayerData {
  name: string;
  cards: number;
  money: number;
  bet: number;
}

export const NewIPlayerData: IPlayerData = {
  name: "",
  cards: 0,
  money: 1000,
  bet: 0,
};

export default IPlayerData;
