class TicTacToe {
  constructor() {
    this._cells = ["", "", "", "", "", "", "", "", ""];
    this.cells = this._cells;
    this.conditions = Object.freeze([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]);
    this.currentPlayer = "x";
    this.over = false;
    this.winner = null;
  }

  rest() {
    this.cells = this._cells;
    this.over = false;
    this.winner = null;
  }

  checkWinner() {
    for (let row of this.conditions) {
      const a = this.cells[row[0]] === this.currentPlayer,
        b = this.cells[row[1]] === this.currentPlayer,
        c = this.cells[row[2]] === this.currentPlayer;
      if (a && b && c) {
        this.winner = this.currentPlayer;
        this.over = true;
      }
    }
    this.currentPlayer = this.currentPlayer !== "x" ? "x" : "o";
    if (this.cells.filter((cell) => cell.trim()).length > 8) this.over = true;
  }

  fillCell(cellNumber) {
    if (this.cells[cellNumber]) this.cells[cellNumber] = this.currentPlayer;
    this.checkWinner();
  }
}

export default TicTacToe;
