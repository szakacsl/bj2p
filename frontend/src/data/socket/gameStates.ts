import IDealerData, { NewIDealerData } from "../dealer/DealerData";
import IPlayerData, { NewIPlayerData } from "../player/PlayerData";

interface IGameStates {
  player: IPlayerData;
  dealer: IDealerData;
  continue: boolean;
}

export const NewIGameStates: IGameStates = {
  player: NewIPlayerData,
  dealer: NewIDealerData,
  continue: false,
};

export default IGameStates;
