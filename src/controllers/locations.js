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

const store = async (req, res) => {
    con.query(
        "INSERT INTO locations (lat, lon, description, plant_id) VALUES (?, ?, ?, ?)",
        [req.body.lat, req.body.lon, req.body.description, req.body.plant_id],
        function (query_err, query_res) {
            if (query_err) return res.json({
                error: 'Query Insert Location Failed',
                success: ''
            })
            else if (query_res.affectedRows <= 0) return res.json({
                error: 'Insert Location Failed',
                success: ''
            })
            else return res.json({
                error: '',
                success: 'Insert Location Success'
            })
        })
}

//Export All Methods
module.exports = {
    index,
    show,
    store
};