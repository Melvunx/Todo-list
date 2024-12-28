const toggleStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  db.query(
    "UPDATE todo SET status = ? WHERE id = ?",
    [status, id],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};

module.exports = { toggleStatus };
