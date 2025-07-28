import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import FilterTabs from "../components/FilterTabs";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos");
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) =>
    filter === "All"
      ? true
      : filter === "Completed"
      ? todo.completed
      : !todo.completed
  );

  const pendingCount = todos.filter((todo) => !todo.completed).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <TodoForm onAdd={fetchTodos} />
      <FilterTabs current={filter} setFilter={setFilter} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredTodos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
        ))
      )}

      <p className="text-sm text-gray-600 mt-4 text-center">
        Pending Tasks: <span className="font-semibold">{pendingCount}</span>
      </p>
      <div className="flex justify-center mt-7">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200 shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
