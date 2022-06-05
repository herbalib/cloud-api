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
        return res.send(locations)
    } catch (error) {
        return res.status(500).send(error);
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
        return res.send(locations)
    } catch (error) {
        return res.status(500).send(error);
    }
}

//Export All Methods
module.exports = {
    index,
    show
};