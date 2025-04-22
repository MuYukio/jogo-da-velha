import { useState } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
  };

  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="restart" onClick={handleRestart}>Reiniciar</button>
    </div>
  );
};

function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6],            // diagonais
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
