const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  todos: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
        require: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
