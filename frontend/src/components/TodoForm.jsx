import React from "react";
import { useState } from "react";
import axios from "axios";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return setError("Todo cannot be empty");
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/todos",
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setText("");
      setError("");
      onAdd();
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder="Add a new task..."
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
}
