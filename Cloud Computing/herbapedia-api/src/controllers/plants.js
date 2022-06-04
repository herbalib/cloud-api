// DB Connection
const {
  con,
  query_select
} = require("../config/database.js");

// To get All Plants, Search Plants, Detail Plants
const index = (req, res) => {
  var result = []

  // Main SQL Plant Query
  var sql_plant = 'SELECT id, name, latin_name, description, consumption, image, ref FROM plants'
  var query_params = []

  // For Detail Page, find plant by ID
  if (req.params.id) {
    sql_plant += ` WHERE id = ?`
    query_params.push(req.params.id)
  }
  // For Search Page, find plant by Name
  else if (req.query.keyword) {
    sql_plant += ` WHERE name LIKE ?`
    query_params.push(`%${req.query.keyword}%`)
  }

  const sql_benefit = "SELECT id, name, plant_id FROM benefits WHERE plant_id = ?"
  const sql_nutrition = "SELECT n.id, n.name, pn.plant_id FROM nutritions n INNER JOIN plants_nutritions pn ON pn.nutrition_id = n.id WHERE plant_id = ?"
  const sql_location = "SELECT id, lat, lon, description, plant_id FROM locations WHERE plant_id = ?"

  con.query(sql_plant, query_params, async (query_err, query_res) => {
    if (query_err) return res.status(500).send(query_err);
    try {
      // Add Benefits and Nutritions to Plant Rows, and optionally Location for Detail Page
      for (const plant of query_res) {
        const benefits = await query_select(con, sql_benefit, [plant.id])
        const nutritions = await query_select(con, sql_nutrition, [plant.id])

        // Only return Location for Detail Page
        if (req.params.id) {
          const locations = await query_select(con, sql_location, [plant.id])
          result.push({
            ...plant,
            benefits,
            nutritions,
            locations
          })
        } else {
          result.push({
            ...plant,
            benefits,
            nutritions
          })
        }
      }
    } catch (error) {
      return res.status(500).send(error);
    } finally {
      return res.json(result);
    }
  });
}

const predict = (req, res) => {
  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8501/v1/models/digits_model:predict";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json.email + ", " + json.password);
    }
  };
  var data = JSON.stringify({
    "email": "hey@mail.com",
    "password": "101010"
  });
  xhr.send(data);
}

//Export All Methods
module.exports = {
  index
};