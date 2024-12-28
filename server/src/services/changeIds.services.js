const db = require("../config/database");
const { UPDATE_POSITION_TODO, ORDER_TODO_BY_POSITION } = process.env;

const updateTaskPosition = (todoIds) => {
  if (!UPDATE_POSITION_TODO) throw new Error("Sql request not defined");

  // Créer un tableau de promesses pour chaque mise à jour de position
  const updatePromises = todoIds.map((todoId, index) => {
    return new Promise((resolve, reject) => {
      // Mettre à jour la position de la tâche
      db.query(UPDATE_POSITION_TODO, [index + 1, todoId], (error) => {
        if (error) {
          console.error("Error updating to-do order: ", error);
          reject(error);
        } else {
          console.log(
            `Updating position for todo with id ${todoId} to ${index + 1}`
          );
          resolve();
        }
      });
    });
  });

  // Attendre que toutes les mises à jour de position soient terminées
  return Promise.all(updatePromises);
};

const getSortedTasks = () => {
  if (!ORDER_TODO_BY_POSITION) throw new Error("Sql request not defined");
  return new Promise((resolve, reject) => {
    db.query(ORDER_TODO_BY_POSITION, (error, result) => {
      if (error) {
        console.error("Error fetching sorted tasks: ", error);
        reject(error);
        return;
      }
      console.log(`res : ${result}`);
      resolve(result);
    });
  });
};

module.exports = { updateTaskPosition, getSortedTasks };
