import { useParams } from 'react-router-dom';
import { getGameComponent, type GameId } from '../../helpers/games';

const GameLoader = () => {
  const { gameId } = useParams<{ gameId: GameId }>();

  const Game = getGameComponent(gameId!);
  return <div className="mt--48">{Game}</div>;
};

export default GameLoader;
