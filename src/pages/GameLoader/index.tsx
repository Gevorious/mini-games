import { useParams } from 'react-router-dom';
import { games } from '../../helpers/games';

type GameId = keyof typeof games;

const GameLoader = () => {
  const { gameId } = useParams<{ gameId: GameId }>();

  if (!gameId || !(gameId in games)) return null;

  const Game = games[gameId];
  return (
    <div className="mt--48">
      <Game />
    </div>
  );
};

export default GameLoader;
