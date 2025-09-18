import Cell from './Cell';
import BoardHeader from './BoardHeader';
import useMinesweeperBoard from '../useMinesweeperBoard';

const Board = () => {
  const { board, status, flagRemaining, reset, onClick, onRightClick } =
    useMinesweeperBoard();

  return (
    <div className="minesweeper__board p--8">
      <BoardHeader
        status={status}
        flagRemaining={flagRemaining}
        reset={reset}
      />
      {board?.map((row) => (
        <div key={`${row[0].coords[0]}`} className="flex">
          {row.map((cell) => (
            <Cell
              key={`${row[0].coords[0]}}${cell.coords[1]}`}
              cell={cell}
              openCell={onClick}
              toggleFlag={onRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
