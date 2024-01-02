const express = require("express");
const todoRoute = express.Router();
const { TodoModel } = require("../model/todo");
const { auth } = require("../middleware/auth");

// Create a new todo
todoRoute.post("/todos", auth, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    //creating new todo
    const todo = new TodoModel({ title, description, completed });
    // saving todo to db
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all todos
todoRoute.get("/todos", auth, async (req, res) => {
  try {
    //getting all todos from db
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a todo
todoRoute.put("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    //updating todo with id
    const todo = await todoRoute.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
todoRoute.delete("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    //deleting todo with id
    await todoRoute.findByIdAndDelete(id);
    res.status(204).send({ msg: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
