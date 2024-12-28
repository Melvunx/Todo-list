const db = require("../config/database");

const { UPDATE_DATETIME } = process.env;

const updateDatetime = (todoId) => {
  if (!UPDATE_DATETIME) throw new Error("Sql request not defined");

  db.query(UPDATE_DATETIME, [todoId], (error) => {
    if (error) throw error;
    console.log("Data updated !");
  });
};

module.exports = { updateDatetime };
