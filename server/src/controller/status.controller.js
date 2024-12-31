const { Handler } = require("../utils/handler");
const db = require("../config/database");

const handler = new Handler();

const toggleStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(process.env.UPDATE_STATUS_TODO, [status, id], (error) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to update status"));
      return;
    }

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
