const express = require("express");
const { connection } = require("./config/DB");
const { userRoute } = require("./routes/user.routes");
const { todoRoute } = require("./routes/todo.routes");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { customMorgan } = require("./middleware/auth");

const app = express();

app.use(morgan(customMorgan));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5, // limit each IP to 2 requests per windowMs
});

app.use(limiter);

app.use(express.json());

app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running");
});
