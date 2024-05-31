import React, { useContext, useState } from "react";
import { TodosContext } from "../state-store/todos";
import todoService from "../../service/todos";
import { statuses } from "../prototype";
import "./todo.css";

const Todo = ({ todo }) => {
  const { setLoading, deleteTodo, dateFormat } = useContext(TodosContext);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(todo.task || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newTodo = await todoService.update({ ...todo, task });
    setLoading(false);
    if (newTodo.error) setError(newTodo.error);
    setEdit(false);
  };

  const onDelete = async () => {
    setLoading(true);
    const result = await todoService.delete(todo.id);
    setLoading(false);
    if (result.error) setError(result.error);
    else deleteTodo(todo);
  };

  return (
    <li className="todo-item">
      <div className="item-task">
        {!edit ? (
          <span onClick={() => setEdit(true)}>{task}</span>
        ) : (
          <>
            <input defaultValue={task} onChange={(e) => setTask(e.target.value)} />
            <span onClick={handleUpdate} className="task-save">
              &#10004;
            </span>
          </>
        )}
      </div>

      <span className="item-priority"> {todo.priority}</span>
      <select name="status" defaultValue={todo.status} id="status" className="item-status nf">
        {statuses.map((status, i) => (
          <option defaultValue={i} key={i}>
            {status}
          </option>
        ))}
      </select>
      <span className="item-date">{new Date(todo.timestamp).toLocaleDateString("en-US", dateFormat)}</span>
      <button type="button" onClick={onDelete} className="btn-delete nf">
        ×
      </button>
      {error && <p>{error}</p>}
    </li>
  );
};

export default Todo;
