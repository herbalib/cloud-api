// DB Connection
const con = require("../config/database.js");

// To get All Plants
const index = (req, res) => {
  var keyword = ""
  if (req.query.keyword) keyword = req.query.keyword
  var sql = "SELECT * FROM plants WHERE name LIKE ?" + 
            "INNER JOIN "
  con.query(sql, [`%${keyword}%`], (query_err, query_res) => {
    if (query_err) return res.status(500).send(query_err);
    res.json(query_res);
  });
};

const show = (req, res) => {
  var sql = "SELECT * FROM plants p "+
            "INNER JOIN benefits b ON p.id = b.plant_id WHERE ID=?"
  con.query(sql, [req.params.id], (query_err, query_res) => {
    if (query_err) return res.sendStatus(500);
    res.json(query_res);
  });
};

//Export All Methods
module.exports = {
  index,
  show,
};
