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
  var plants = []

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
  // Find location less than 5 km
  const sql_location = `SELECT id, 
                        lat, 
                        lon, 
                        description, 
                        plant_id, 
                        (
                           6371 *
                           acos(cos(radians(?)) * 
                           cos(radians(lat)) * 
                           cos(radians(lon) - 
                           radians(?)) + 
                           sin(radians(?)) * 
                           sin(radians(lat)))
                        ) AS distance 
                        FROM locations 
                        WHERE plant_id = ?
                        HAVING distance < 5
                        ORDER BY distance DESC`

  con.query(sql_plant, query_params, async (query_err, query_res) => {
    if (query_err) return res.status(200).json({
      error: query_err,
      success: ''
    });
    try {
      // Add Benefits and Nutritions to Plant Rows, and optionally Location for Detail Page
      for (const plant of query_res) {
        const benefits = await query_select(con, sql_benefit, [plant.id])
        const nutritions = await query_select(con, sql_nutrition, [plant.id])

        // Only return Location for Detail Page
        if (req.params.id) {
          const locations = await query_select(con, sql_location, [req.query.lat, req.query.lon, req.query.lat, plant.id])
          plants.push({
            ...plant,
            benefits,
            nutritions,
            locations
          })
        } else {
          plants.push({
            ...plant,
            benefits,
            nutritions
          })
        }
      }
    } catch (catch_err) {
      return res.json({
        error: catch_err,
        success: ''
      });
    } finally {
      return res.json({
        error: '',
        success: 'Get Plant Success',
        plants
      });
    }
  });
}

const predict = async (req, res) => {
  const plant_names = ['Andong', 'Bayam Duri', 'Binahong', 'Cincau Hijau', 'Jeruk Nipis', 'Kelor', 'Kemangi', 'Kumis Kucing', 'Meniran', 'Mint', 'Pandan', 'Pepaya', 'Sambiloto', 'Sembung', 'Serai', 'Singkong', 'Sirih', 'Talas']
  await Jimp.read(req.file.buffer)
    .then(async image => {
      // For Image Visualization
      // tensor_3d_visual= tf.tensor(image.bitmap.data).reshape([image.bitmap.height, image.bitmap.width, -1]).transpose().slice([0, 0, 0], [3, image.bitmap.width, image.bitmap.height]).transpose([0, 2, 1]);
      // tensor_3d_flat = tensor_3d_original.clone().reshape([3, -1])
      // tf.print(tensor_3d_visual, true)

      // For Prediction
      tensor_3d_original = tf.tensor(image.resize(384, 384).bitmap.data).reshape([image.bitmap.height, image.bitmap.width, -1]).transpose().slice([0, 0, 0], [3, image.bitmap.width, image.bitmap.height]).transpose().reshape([image.bitmap.height, image.bitmap.width, -1]).expandDims(0);
      console.log('Input Shape ' + tensor_3d_original.shape)
      // tf.print(tensor_3d_original)

      try {
        // Import the Model (Through file or local API)
        const model = await tf.loadLayersModel('file://src/model/model.json')
        // console.log(model.summary());
        // const model = await tf.loadLayersModel('http://localhost:23450/model/model.json')

        // Predict the File
        const prediction = model.predict(tensor_3d_original)
        const idx_pred = prediction.argMax(-1).dataSync()[0]
        console.log(plant_names[idx_pred])

        res.json({
          error: '',
          success: `Predict Plant Data Success`,
          plant_name: plant_names[idx_pred]
        });
      } catch (catch_err) {
        console.log(catch_err)
        res.json({
          error: catch_err,
          success: ''
        });
      }
    })
    .catch(catch_err => {
      res.json({
        error: catch_err,
        success: ''
      });
    });
}

//Export All Methods
module.exports = {
  index,
  predict
};