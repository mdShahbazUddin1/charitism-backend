const express = require("express");
const todoRoute = express.Router();
const TodoModel = require("../model/todo");
const { auth } = require("../middleware/auth");

// Create a new todo
todoRoute.post("/todos", auth, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = new TodoModel({ title, description, completed });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
