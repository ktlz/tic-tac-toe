import React, {useState} from 'react';
import { calculateWinner } from '../helper';
import Board from './Board';
import './Game.css';

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);

  const handleClick = (index) => {
    const boardCopy = [...board]

    if(winner || boardCopy[index]) {

      return;
    };
    boardCopy[index] = xIsNext ? 'X' : 'O';

    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }


  const startNewGame = () => {

    return (
      <button className="start__btn" onClick={() => {
        setBoard(Array(9).fill(null))
        if(winner && winner === 'X') {
          setXCount(xCount + 1);
        }

        if(winner && winner === 'O') {
          setOCount(oCount + 1);
        }}
      }>Play again</button>
    )
  }

  return (
    <div className="wrapper">
      {startNewGame()}
      <div>X: {xCount}</div>
      <div>O: {oCount}</div>
      <p>{winner ? winner + ' is a winner' : xIsNext ? 'X is next' : 'O is next'}</p>
      <Board squares={board} click={handleClick} />
    </div>
  )
}
