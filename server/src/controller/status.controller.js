const { Handler } = require("../utils/handler");
const db = require("../config/database");

const handler = new Handler();

const { UPDATE_STATUS_TODO, UPDATE_DATETIME } = process.env;

const toggleStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!UPDATE_STATUS_TODO || !UPDATE_DATETIME) {
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
  } else if (!status) {
    res
      .status(400)
      .send(
        handler.requestFailed(
          new Error("Status is required"),
          "Status is required"
        )
      );
    return;
  }

  db.query(UPDATE_STATUS_TODO, [status, id], (error) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to update status"));
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

    handler.loggedRequestSuccessed("Updated todo status", {
      todoId: id,
      status: status === 1 ? true : false,
    });

    res.status(200).json(
      handler.requestSuccessed("Updated todo status", {
        todoId: id,
        status: status === 1 ? true : false,
      })
    );
  });
};

module.exports = { toggleStatus };
