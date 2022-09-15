import IPlayerData from "../../data/player/PlayerData";

interface IPlayerProps {
  player: IPlayerData | undefined;
}

const Player: React.FC<IPlayerProps> = (props: IPlayerProps) => {
  const { player } = props;
  return (
    <>
      <h3>{player?.name}</h3>
      <h3>Generated cards:</h3>
      {player?.cards}
      <h3>Money:</h3>
      {player?.money}
    </>
  );
};

export default Player;
