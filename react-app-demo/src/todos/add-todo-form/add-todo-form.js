import React, { useContext, useState } from "react";
import { TodosContext } from "../state-store/todos";
import todoService from "../../service/todos";
import { statuses, priorities } from "../prototype";
import "./add-todo-form.css";

const AddTodoForm = () => {
  const { setLoading, setError, addTodo } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState({ task: "", priority: "Low", status: "uncompleted" });

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const todo = await todoService.create(newTodo);
    if (todo.error) setError(todo.error);
    else addTodo(todo);
    setLoading(false);
    e.target.reset();
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit} className="add-todo-form">
      <div className="inputs-wrapper">
        <div className="input-field">
          <input type="text" name="task" required placeholder="Task" className="nf" />
        </div>

        <div className="input-field">
          <div className="select-wrapper">
            <label htmlFor="priority">Priority: </label>
            <select name="priority" defaultValue={priorities[0]} id="priority" className="nf">
              {priorities.map((priority, i) => (
                <option defaultValue={i} key={i}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div className="select-wrapper">
            <label htmlFor="status">Status: </label>
            <select name="status" defaultValue={statuses[0]} id="status" className="nf">
              {statuses.map((status, i) => (
                <option defaultValue={i} key={i}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
