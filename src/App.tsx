import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './compositions/Layout';
import GameLoader from './pages/GameLoader';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games/:gameId" element={<GameLoader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
