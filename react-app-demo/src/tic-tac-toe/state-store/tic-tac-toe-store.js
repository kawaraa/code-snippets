import React, { createContext, useState } from "react";

const ticTacToe = {
  squares: ["", "", "", "", "", "", "", "", ""],
  conditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  currentPlayer: "x",
  over: false,
  winner: "",
};

export const TicTacToeContext = createContext();

const TicTacToeStore = (props) => {
  const conditions = ticTacToe.conditions;
  const [squares, setSquares] = useState(ticTacToe.squares);
  const [currentPlayer, setCurrentPlayer] = useState(ticTacToe.currentPlayer);
  const [over, setOver] = useState(ticTacToe.over);
  const [winner, setWinner] = useState(ticTacToe.winner);

  const restGame = () => {
    setWinner("");
    setOver(false);
    setSquares(ticTacToe.squares);
  };

  const checkWinner = (squaresCopy) => {
    setSquares(squaresCopy);
    for (let row of conditions) {
      const a = squaresCopy[row[0]] === currentPlayer,
        b = squaresCopy[row[1]] === currentPlayer,
        c = squaresCopy[row[2]] === currentPlayer;
      if (a && b && c) {
        setWinner(currentPlayer);
        if (!over) setOver(true);
      }
    }
    if (!over) setCurrentPlayer(currentPlayer !== "x" ? "x" : "o");
    if (squaresCopy.filter((cell) => cell.trim()).length > 8) setOver(true);
  };

  const fillSquare = (cellNumber) => {
    const squaresCopy = [...squares];
    if (cellNumber < 9 && !squaresCopy[cellNumber]) {
      squaresCopy[cellNumber] = currentPlayer;
      checkWinner(squaresCopy);
    }
  };

  const state = { squares, currentPlayer, over, winner, fillSquare, restGame };

  return <TicTacToeContext.Provider value={state}>{props.children}</TicTacToeContext.Provider>;
};

export default TicTacToeStore;
