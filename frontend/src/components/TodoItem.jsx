import React from "react";
import { useState } from "react";
import axios from "axios";

export default function TodoItem({ todo, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const token = localStorage.getItem("token");

  const toggleComplete = async () => {
    await axios.patch(
      `http://localhost:5000/todos/${todo.id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    onUpdate();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/todos/${todo.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onUpdate();
  };

  const handleEdit = async () => {
    if (!newText.trim()) return;
    await axios.put(
      `http://localhost:5000/todos/${todo.id}`,
      { text: newText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setEditing(false);
    onUpdate();
  };

  return (
    <div className="flex justify-between items-center p-3 bg-white rounded shadow-sm mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
        />
        {editing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border p-1 rounded"
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {editing ? (
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
