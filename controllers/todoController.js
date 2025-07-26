import pool from "../config/db.js";

// get all todos
export const getTodos = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Server error while fetching todos" });
  }
};

// create a new todo
export const createTodo = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *",
      [text, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ message: "Server error while creating todo" });
  }
};

// update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
    const { text, completed } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "UPDATE todos SET text = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [text, completed, id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Server error while updating todo" });
  }
};

// delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Server error while deleting todo" });
  }
};
