// DB Connection
const {
    con,
    query_select
} = require("../config/database.js");

const index = async (req, res) => {
    try {
        const sql_location = `SELECT l.id, l.lat, l.lon, l.description, l.plant_id, 
                              p.name, p.image 
                              FROM locations l 
                              INNER JOIN plants p ON p.id = l.plant_id`
        const locations = await query_select(con, sql_location, [])
        return res.json({
            error: '',
            success: 'Find Plants Locations Success',
            locations
        })
    } catch (catch_err) {
        return res.json({
            error: catch_err,
            success: ''
        });
    }
}

const show = async (req, res) => {
    try {
        const sql_location = `SELECT l.id, l.lat, l.lon, l.description, l.plant_id, 
                              p.name, p.image 
                              FROM locations l
                              INNER JOIN plants p ON p.id = l.plant_id
                              WHERE l.plant_id = ?`
        const locations = await query_select(con, sql_location, [req.params.plant_id])
        return res.json({
            error: '',
            success: 'Find Plant Locations Success',
            locations
        })
    } catch (catch_err) {
        return res.json({
            error: catch_err,
            success: ''
        });
    }
}

//Export All Methods
module.exports = {
    index,
    show
};