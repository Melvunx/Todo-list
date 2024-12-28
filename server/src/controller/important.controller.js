const { Handler } = require("../utils/handler");
const db = require("../config/database");

const handler = new Handler();

const toggleImportant = (req, res) => {
  const { id } = req.params;
  const { important } = req.body;
  db.query(process.env.UPDATE_IMPORTANCE_TODO, [important, id], (error) => {
    if (error) {
      res
        .status(500)
        .send(handler.requestFailed(error, "Error to update importance"));
      return;
    }

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
