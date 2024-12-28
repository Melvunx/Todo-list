const toggleImportant = (req, res) => {
  const id = req.params.id;
  const { important } = req.body;
  db.query(
    "UPDATE todo SET important = ? WHERE id = ?",
    [important, id],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};

module.exports = { toggleImportant };
