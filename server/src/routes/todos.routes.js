const {
  changeOrder,
  deleteTodo,
  getTodoByName,
  getTodos,
  newTodo,
} = require("../controller/todos.controller");
const express = require("express");
const router = express.Router();

router.get("/", getTodos);

router.get("/search?=:todo", getTodoByName);

router.post("/new-todo", newTodo);

router.patch("/order", changeOrder);

router.delete("/:id", deleteTodo);

module.exports = router;
