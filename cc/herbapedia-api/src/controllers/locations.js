// DB Connection
const {
    con,
    query_select
} = require("../config/database.js");

const index = async (req, res) => {
    try {
        const sql_location = `SELECT 
                              l.id, 
                              l.lat, 
                              l.lon, 
                              l.description, 
                              l.plant_id, 
                              (
                                 6371 *
                                 acos(cos(radians(?)) * 
                                 cos(radians(l.lat)) * 
                                 cos(radians(l.lon) - 
                                 radians(?)) + 
                                 sin(radians(?)) * 
                                 sin(radians(l.lat)))
                              ) AS distance, 
                              p.name, p.image 
                              FROM locations l 
                              INNER JOIN plants p ON p.id = l.plant_id
                              HAVING distance < 5
                              ORDER BY distance DESC`
        const locations = await query_select(con, sql_location, [req.query.lat, req.query.lon, req.query.lat])
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
        const sql_location = `SELECT 
                              l.id, 
                              l.lat, 
                              l.lon, 
                              l.description, 
                              l.plant_id, 
                              (
                                6371 *
                                acos(cos(radians(?)) * 
                                cos(radians(l.lat)) * 
                                cos(radians(l.lon) - 
                                radians(?)) + 
                                sin(radians(?)) * 
                                sin(radians(l.lat)))
                              ) AS distance, 
                              p.name, p.image 
                              FROM locations l 
                              INNER JOIN plants p ON p.id = l.plant_id
                              WHERE l.plant_id = ?
                              HAVING distance < 5
                              ORDER BY distance DESC`
        const locations = await query_select(con, sql_location, [req.query.lat, req.query.lon, req.query.lat, req.params.plant_id])
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