const express = require("express");
const todoRoute = express.Router();
const { TodoModel } = require("../model/todo");
const { auth } = require("../middleware/auth");

// Create a new todo
todoRoute.post("/addtodo", auth, async (req, res) => {
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
todoRoute.get("/gettodo", auth, async (req, res) => {
  try {
    //getting all todos from db
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a todo
todoRoute.put("/updatetodo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    //updating todo with id
    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
todoRoute.delete("/deletetodo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    //deleting todo with id
    await TodoModel.findByIdAndDelete(id);
    res.status(204).send({ msg: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { todoRoute };
