const express = require("express");
const todoRoute = express.Router();
const { TodoModel } = require("../model/todo");
const { auth } = require("../middleware/auth");
const { UserModel } = require("../model/user");

// Create a new todo
todoRoute.post("/addtodo", auth, async (req, res) => {
  const userId = req.userId;
  try {
    const { title, description, completed } = req.body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed !== "boolean"
    )
      return res.status(400).send({
        msg: "title & description must be string, completed must be boolean",
      });

    // Check if the user already exists
    let user = await TodoModel.findOne({ userId: userId });

    if (!user) {
      // If user doesn't exist, create a new user with the provided userId
      user = new TodoModel({ userId: userId, todos: [] });
    }

    // Create a new todo
    const todo = { title, description, completed };

    // Push the new todo to the todos array
    user.todos.push(todo);

    // Save the user document
    await user.save();

    res.status(201).json(user.todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all todos
todoRoute.get("/gettodo", auth, async (req, res) => {
  const userId = req.userId;
  try {
    //getting all todos from db
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).send({ msg: "User Not found" });

    // Retrieve all todos for the specific user
    const todos = await TodoModel.find({ userId: userId });

    res.status(200).send({ msg: "All Todos", todos });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Update a todo
todoRoute.put("/updatetodo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Check if the todo with the given id belongs to the authenticated user
    const user = await TodoModel.findOne({ userId: req.userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const todoToUpdate = user.todos.id(id);

    if (!todoToUpdate) {
      return res
        .status(404)
        .json({ msg: "Todo not found or does not belong to the user" });
    }

    // Update the todo fields
    todoToUpdate.title = title;
    todoToUpdate.description = description;
    todoToUpdate.completed = completed;

    // Save the updated user document
    await user.save();

    res.status(200).json(todoToUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
todoRoute.delete("/deletetodo/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the todo with the given id belongs to the authenticated user
    const user = await TodoModel.findOne({ userId: req.userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const todoToDelete = user.todos.id(id);

    if (!todoToDelete) {
      return res
        .status(404)
        .json({ msg: "Todo not found or does not belong to the user" });
    }

    // Remove the todo from the array
    todoToDelete.remove();

    // Save the updated user document
    await user.save();

    res.status(204).send({ msg: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { todoRoute };
