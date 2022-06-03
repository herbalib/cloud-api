// DB Connection
const con = require("../config/database.js");

// To get All Plants
const index = (req, res) => {
  con.query("SELECT * FROM plants", (query_err, query_res) => {
    if (query_err) return res.sendStatus(500);
    res.json(query_res);
  });
};

const show = (req, res) => {
  con.query("SELECT * FROM plants WHERE ID=?", [req.params.id], (query_err, query_res) => {
    if (query_err) return res.sendStatus(500);
    res.json(query_res);
  });
};

//Export All Methods
module.exports = {
  index,
  show,
};
