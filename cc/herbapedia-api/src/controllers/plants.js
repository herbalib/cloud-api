// DB Connection
const {
  con,
  query_select
} = require("../config/database.js");

// Library Prediction
// To Disable Warning : TF_CPP_MIN_LOG_LEVEL=3
const tf = require('@tensorflow/tfjs-node');
var Jimp = require('jimp');

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

const predict = async (req, res) => {
  await Jimp.read(req.file.buffer)
    .then(async image => {
      // For Image Visualization
      // tensor_3d_original = tf.tensor(image.bitmap.data).reshape([image.bitmap.height, image.bitmap.width, -1]).transpose().slice([0, 0, 0], [3, image.bitmap.width, image.bitmap.height]).transpose([0, 2, 1]);
      // tensor_3d_flat = tensor_3d_original.clone().reshape([3, -1])
      
      // For Prediction
      tensor_3d_original = tf.tensor(image.resize(384,384).bitmap.data).reshape([image.bitmap.height, image.bitmap.width, -1]).transpose().slice([0, 0, 0], [3, image.bitmap.width, image.bitmap.height]).transpose().reshape([image.bitmap.height, image.bitmap.width, -1]);
      console.log('Input Shape ' + tensor_3d_original.shape)

      try {
        // Import the Model (Through file or local API)
        const model = await tf.loadLayersModel('file://src/model/model.json')
        console.log(model.summary());
        // const model = await tf.loadLayersModel('http://localhost:23450/model/model.json')

        // Predict the File
        // const prediction = model.predict(tensor_3d_original)
        res.send("Success")
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    });
}

//Export All Methods
module.exports = {
  index,
  predict
};