import useMemoryGame from './useMemoryGame';
import './styles.scss';
import Countdown from './_partials/Countdown';

const Memory = () => {
  const { isStarted, board, onCardClick, isFlipped, resetBoard } =
    useMemoryGame();

  return (
    <div className="memory-game mx--auto">
      <div className="heading">
        <Countdown started={isStarted} reset={resetBoard} />
      </div>
      <div className="memory-board p--8 mx--auto">
        {board.map((card, i) => (
          <div
            key={card.id}
            className={`memory-card ${
              card.isOpen || isFlipped(card.id) ? 'flipped' : ''
            }`}
            onClick={() => !card.isOpen && onCardClick(i)}
          >
            <div className="memory-card__inner">
              <div className="memory-card__front"></div>
              <div className="memory-card__back">
                <img
                  src={`https://picsum.photos/100?seed=${card.seed}`}
                  alt="card"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
