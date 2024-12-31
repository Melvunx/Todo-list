const { Handler } = require("../utils/handler");
const db = require("../config/database");

const handler = new Handler();

const { UPDATE_IMPORTANCE_TODO, UPDATE_DATETIME } = process.env;

const toggleImportant = (req, res) => {
  const { id } = req.params;
  const { important } = req.body;
  db.query(UPDATE_IMPORTANCE_TODO, [important, id], (error) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to update importance"));
      return;
    }

    if (!UPDATE_IMPORTANCE_TODO || !UPDATE_DATETIME) {
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
    } else if (!important) {
      res
        .status(400)
        .send(
          handler.requestFailed(
            new Error("Important is required"),
            "Important is required"
          )
        );
      return;
    }

    db.query(UPDATE_DATETIME, [id], (error) => {
      if (error) {
        res
          .status(500)
          .send(handler.requestFailed(error, "Error to update the datetime"));
        return;
      }
      console.log("Datetime updated");
    });

    handler.loggedRequestSuccessed("Todo importance updated", {
      todoId: id,
      important: important === 1 ? true : false,
    });

    res.status(200).json(
      handler.requestSuccessed("Todo importance updated", {
        todoId: id,
        important: important === 1 ? true : false,
      })
    );
  });
};

module.exports = { toggleImportant };
