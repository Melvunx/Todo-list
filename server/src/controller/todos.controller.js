const { Handler } = require("../utils/handler");
const {
  updateTaskPosition,
  getSortedTasks,
} = require("../services/changeIds.services");
const db = require("../config/database");
const { Generator } = require("../services/generate.services");

const { GET_TODOS, SEARCH_TODOS, CREATE_TODO, UPDATE_TODO_LIST, DELETE_TODO } =
  process.env;

const handler = new Handler();
const generator = new Generator(15);

const getTodos = (req, res) => {
  if (!GET_TODOS) {
    res
      .status(500)
      .send(
        handler.requestFailed(
          new Error("Sql request not defined"),
          "Element undefined"
        )
      );
    return;
  }
  db.query(GET_TODOS, (error, todos) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error fetching todos"));
      return;
    }

    handler.loggedRequestSuccessed("Get all todos", { todos });
    res.status(200).json(handler.requestSuccessed("Get all todos", { todos }));
  });
};

const getTodoByName = (req, res) => {
  const { search } = req.params;

  if (!SEARCH_TODOS) {
    res
      .status(500)
      .send(
        handler.requestFailed(
          new Error("Sql request not defined"),
          "Element undefined"
        )
      );
    return;
  }

  db.query(SEARCH_TODOS, [`%${search}%`], (error, todos) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to fetch searched todos"));
      return;
    }

    handler.loggedRequestSuccessed("Get searched todo", { todos });
    res
      .status(200)
      .json(handler.requestSuccessed("Get searched todo", { todos }));
  });
};

const newTodo = (req, res) => {
  const {
    todo: { list, important },
  } = req.body;

  if (!CREATE_TODO || !GET_TODOS) {
    handler.requestFailed(
      new Error("Sql request not defined"),
      "Element undefined"
    );
    return;
  } else if (!list || important == null) {
    res
      .status(400)
      .json(
        handler.requestFailed(
          new Error("Missing required fields"),
          "Missing fields"
        )
      );
    return;
  }

  let position;

  db.query(GET_TODOS, (error, todos) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to fetch todos"));
      return;
    }

    position = todos.length + 1;

    const todoId = generator.generateIds();

    db.query(CREATE_TODO, [todoId, list, important, position], (error) => {
      if (error) {
        res
          .status(500)
          .send(handler.requestFailed(error, "Error to create new todo"));
        return;
      }

      const data = {
        todo: {
          id: todoId,
          list,
          important: important === 1 ? true : false,
          position,
        },
      };

      handler.loggedRequestSuccessed("Todo created", data);

      res.status(201).json(handler.requestSuccessed("Todo created", data));
    });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;

  if (!UPDATE_TODO_LIST) {
    res
      .status(500)
      .send(
        handler.requestFailed(
          new Error("Sql request not defined"),
          "Element undefined"
        )
      );
    return;
  } else if (!id) {
    res
      .status(400)
      .send(
        handler.requestFailed(new Error("Id is required"), "Id is required")
      );
    return;
  }

  db.query(UPDATE_TODO_LIST, [list, id], (error) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to update the list"));
      return;
    }

    handler.loggedRequestSuccessed("Todo updated", {
      todo: { id, list },
    });

    res
      .status(200)
      .json(handler.requestSuccessed("Updated list", { todo: { id, list } }));
  });
};

const changeOrder = (req, res) => {
  const { todoIds } = req.body;
  updateTaskPosition(todoIds)
    .then(() => {
      return getSortedTasks();
    })
    .then((sortedTodos) => {
      handler.loggedRequestSuccessed("Get sorted todos", { sortedTodos });

      res
        .status(200)
        .json(handler.requestSuccessed("get sorted todos", { sortedTodos }));
    })
    .catch((error) => {
      handler.loggedRequestFailed(error, "Error caught");
      res.status(500).send(handler.requestFailed(error, "Error caught"));
    });
  return;
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (!DELETE_TODO) {
    res
      .status(500)
      .send(
        handler.requestFailed(
          new Error("Sql request not defined"),
          "Element undefined"
        )
      );
    return;
  }

  db.query(DELETE_TODO, [id], (error, okParams) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to deleted todos"));
      return;
    }

    if (okParams.affectedRows === 0) {
      res
        .status(500)
        .send(
          handler.requestFailed(new Error("Todo not deleted"), "Todo not found")
        );
      return;
    }

    handler.loggedRequestSuccessed("Todo deleted", { todoId: id });
    res
      .status(200)
      .json(handler.requestSuccessed("Todo deleted", { todoId: id }));
  });
};

module.exports = {
  getTodos,
  getTodoByName,
  newTodo,
  changeOrder,
  updateTodo,
  deleteTodo,
};
