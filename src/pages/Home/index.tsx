import DashboardCard from '../../components/DashboardCard';
import { games } from '../../configs/games';
import './styles.scss';

const Home = () => {
  return (
    <div className="dashboard flex justify--evenly p--32 mr--48">
      {games.map((game) => (
        <DashboardCard
          key={game.id}
          title={game.title}
          to={`/games/${game.id}`}
        />
      ))}
    </div>
  );
};

export default Home;
