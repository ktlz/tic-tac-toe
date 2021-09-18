import React from 'react';
import './Board.css';
import Square from './Square';

export default function Board({squares, click, line}) {
  return (
    <div className="board">
      {
        squares.map((square, i) => <Square key={i} value={square} onClick={() => click(i)} />)
      }
      <div className={line ? `line line-${line[0]}-${line[1]}-${line[2]}` : 'line'}></div>
    </div>
  )
}
