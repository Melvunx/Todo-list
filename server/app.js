require("dotenv").config();
const express = require("express");
const db = require("./src/config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${Number(PORT)}`);
});

db.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Connected to database");
});

const todosRoutes = require("./src/routes/todos.routes");
const statusRoutes = require("./src/routes/status.routes");
const importantRoutes = require("./src/routes/important.routes");

app.use("/api/todos", todosRoutes);
app.use("/api/todo-status", statusRoutes);
app.use("/api/todo-important", importantRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
