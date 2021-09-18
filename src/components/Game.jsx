import React, {useState} from 'react';
import { calculateGameResult } from '../helper';
import Board from './Board';
import './Game.css';
import {Box, Modal, Typography, Button, TextField} from "@material-ui/core";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

const typography = {
  color: '#000',
  marginBottom: '20px',
};

export default function Game() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const gameResult = calculateGameResult(board);
  const line = gameResult && gameResult[1] ? gameResult[1] : null;
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

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
    if(gameResult && gameResult[0] && gameResult[0] === '-'){
      alert('IT IS A DRAW');
      setBoard(Array(9).fill(null))
    }
    return (
      <button className="start__btn" onClick={() => {
        setBoard(Array(9).fill(null))

        if(gameResult && gameResult[0] && gameResult[0] === 'X') {
          setXCount(xCount + 1);
        }

        if(gameResult && gameResult[0] && gameResult[0] === 'O') {
          setOCount(oCount + 1);
        }}
      }>Play again</button>
    )
  }

  return (
    <div className="wrapper">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={typography} id="modal-modal-title" variant="h6" component="h2">
            Enter your names
          </Typography>
          <TextField id="outlined-basic" label="First player's name" variant="outlined" onChange={event => setPlayer1(event.target.value)} />
          <TextField sx={{marginTop: '10px'}} id="outlined-basic" label="Second player's name" variant="outlined" onChange={event => setPlayer2(event.target.value)} />
          <Button sx={{marginTop: '20px'}} variant="outlined" color="success" onClick={() => handleClose()}>Submit</Button>
        </Box>
      </Modal>
      <Board squares={board} click={handleClick} line={line} />
      <div className="info__container">
        <div>Score</div>
        <div>{player1}: {xCount}</div>
        <div>{player2}: {oCount}</div>
        <p>{gameResult && gameResult[0] && gameResult[0] !== "-" ? gameResult[0] + ' is a winner' : xIsNext ? 'X is next' : 'O is next'}</p>
        {startNewGame()}
      </div>
    </div>
  )
}
