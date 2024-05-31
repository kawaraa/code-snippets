import React, { useContext } from "react";
import { TicTacToeContext } from "../state-store/tic-tac-toe-store";
import "./square.css";

function Square(props) {
  const { fillSquare } = useContext(TicTacToeContext);

  const handleClick = () => (Boolean(props.value) ? null : fillSquare(props.number));

  return (
    <button
      onClick={handleClick}
      name={props.number}
      disabled={Boolean(props.value)}
      style={{ height: props.height }}
      className={"square " + props.value}>
      <span className="square-value">{props.value}</span>
    </button>
  );
}

export default Square;
