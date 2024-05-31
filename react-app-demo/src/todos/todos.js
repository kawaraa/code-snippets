import React, { useContext, useEffect } from "react";
import { TodosContext } from "./state-store/todos";
import todoService from "../service/todos";
import Loading from "../layout/loading/loading";
import AddTodoForm from "./add-todo-form/add-todo-form";
import Todo from "./todo/todo";
import "./todos.css";

function Todos(props) {
  const { loading, error, setError, todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    (async () => {
      const todosResult = await todoService.get();
      if (todosResult.error) setError(todosResult.error);
      else setTodos(todosResult);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p className="todos error">{error}</p>;

  const todoComponents = todos.map((todo) => <Todo todo={todo} key={todo.id} />);
  return (
    <main className="todos container">
      <h1 className="todos-heading">Todos</h1>
      <AddTodoForm />
      <ul className="todos-wrapper">
        <li className="todo-item header">
          <span className="item-task">Task</span>
          <span className="item-priority">Priority</span>
          <span className="item-status">Status</span>
        </li>
        {todos[0] ? todoComponents : <p className="no-todos">There are no todos.</p>}
      </ul>
      {loading && <Loading />}
    </main>
  );
}

export default Todos;
