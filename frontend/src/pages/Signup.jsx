import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return setError("Fields cannot be empty");
    }

    try {
      await axios.post("http://localhost:5000/users/register", form);
      navigate("/");
    } catch (err) {
      setError("Username already exists");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full mb-3 p-2 border"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-green-500 text-white w-full py-2 rounded mt-3 hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
