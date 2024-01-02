const express = require("express");
const { connection } = require("./config/DB");

const app = express();

app.use(express.json());

app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running");
});
