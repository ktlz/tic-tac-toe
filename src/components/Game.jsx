import React, {useState} from 'react';
import { calculateGameResult } from '../helper';
import Board from './Board';
import './Game.css';

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const gameResult = calculateGameResult(board);
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);

  const [player, setPlayer] = useState('');

    React.useEffect(() => {
      const player = prompt("Please enter your name");
      setPlayer(player);

    }, [])

  const handleClick = (index) => {
    const boardCopy = [...board]

    if(gameResult || boardCopy[index]) {
      return
    };

    boardCopy[index] = xIsNext ? 'X' : 'O';

    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }


  const startNewGame = () => {

    return (
      <button className="start__btn" onClick={() => {
        setBoard(Array(9).fill(null))
        if(gameResult && gameResult === 'X') {
          setXCount(xCount + 1);
        }

        if(gameResult && gameResult === 'O') {
          setOCount(oCount + 1);
        }}
      }>Play again</button>
    )
  }

  return (
    <div className="wrapper">
      <Board squares={board} click={handleClick} />
      <div className="info__container">
        <div>Score</div>
        <div>{player}: {xCount}</div>
        <div>Player 2: {oCount}</div>
        <p>{gameResult === '-' ? 'no winner' : ''}</p>
        <p>{gameResult && gameResult!=="-" ? gameResult + ' is a winner' : xIsNext ? 'X is next' : 'O is next'}</p>
        {startNewGame()}
      </div>
    </div>
  )
}
