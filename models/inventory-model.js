const pool = require("../database/")

/* **********************************
* Get all classification data
* ******************************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* *********************************
 * Get all inventory items and classification_name by classification_id
 * ******************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c 
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error" + error)
    }
}


/* ******************************************
 * Get details for vehicle selected from inventory page
 * ****************************************** */
async function getInvDetails(inv_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            WHERE inv_id =  $1`,
            [inv_id]
        )
        return data.rows
    } catch (error) {
        console.error("getInvDetails error" + error)
    }
}


/* ******************************
 *   Update inventory vehicle
 * **************************** */
async function updateInventory(
    inv_id,
    inv_make, 
    inv_model, 
    inv_description,
    inv_image, 
    inv_thumbnail, 
    inv_year, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id,
    ) {
    try {
        const sql = "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_year = $6, inv_price = $7,inv_miles = $8, inv_color = $9,classification_id = $10 WHERE inv_id = $11 RETURNING *"
        const data =  await pool.query(sql, [
            inv_make, 
            inv_model, 
            inv_description,
            inv_image, 
            inv_thumbnail, 
            inv_year, 
            inv_price, 
            inv_miles, 
            inv_color, 
            classification_id,
            inv_id,
            ])
            return data.rows[0]
    } catch (error) {
        console.error("model error: " + error)
    }
}


/* ******************************
 *   Delete inventory vehicle
 * **************************** */
async function deleteInventory( inv_id ) {
    try {
        const sql = "DELETE FROM inventory WHERE inv_id = $1"
        const data =  await pool.query(sql, [inv_id,])
            return data
    } catch (error) {
        new Error("Delete Inventory Error")
    }
}








module.exports = {getClassifications, getInventoryByClassificationId, getInvDetails, updateInventory, deleteInventory}
