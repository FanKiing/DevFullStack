import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrSaveTodo = () => {
    if (newTodo.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: newTodo } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: newTodo, completed: false, deleted: false }]);
    }
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, deleted: true } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Todo List</h1>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addOrSaveTodo}>
          {editIndex !== null ? "Save" : "Add"}
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              textDecoration: todo.deleted || todo.completed ? "line-through" : "none",
              color: todo.deleted ? "red" : "black",
            }}
          >
            <span onClick={() => toggleTodo(index)} style={{ cursor: "pointer" }}>
              {todo.text}
            </span>

            <div className="d-flex gap-2">
              <button className="btn btn-warning btn-sm" onClick={() => startEditTodo(index)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
