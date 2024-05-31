import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/navbar/navbar";
import TicTacToe from "./tic-tac-toe/tic-tac-toe";
import TicTacToeStore from "./tic-tac-toe/state-store/tic-tac-toe-store";
import Todos from "./todos/todos";
import TodosStore from "./todos/state-store/todos";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <TicTacToeStore>
              <TicTacToe {...props} />
            </TicTacToeStore>
          )}
        />
        <Route
          exact
          path="/todos"
          render={(props) => (
            <TodosStore>
              <Todos {...props} />
            </TodosStore>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
