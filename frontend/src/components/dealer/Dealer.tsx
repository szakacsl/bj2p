import IDealerData from "../../data/dealer/DealerData";

interface IDealerProps {
  dealer: IDealerData | undefined;
  // setDealer: (data: IDealerData) => void;
}

const Player: React.FC<IDealerProps> = (props: IDealerProps) => {
  const { dealer } = props;

  return (
    <>
      <h3>Dealer</h3>
      <h3>Generated cards:</h3>
      {dealer?.cards}
    </>
  );
};

export default Player;
