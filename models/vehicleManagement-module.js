const pool = require('../database/')

/* ******************************
 *   Register new classification
 * **************************** */
async function addClassification(classification_name) {
    try {
        const sql = "INSERT INTO classification (classification_name) VALUES ($1) "
        return await pool.query(sql, [classification_name])
    } catch (error) {
        return error.message
    }
}

/* ******************************
 *   Register new inventory vehicle
 * **************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_description,inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
    try {
        const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price,inv_miles, inv_color,classification_id) VALUES   ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) "
        return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description ,inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
    } catch (error) {
        return error.message
    }
}



// async function checkExistingEmail(account_email) {
//     try {
//         const sql = "SELECT * FROM account WHERE account_email = $1"
//         const email = await pool.query(sql, [account_email])
//         return email.rowCount
//     } catch (error) {
//         return error.message
//     }
// }


/* ******************************
 *   Register new test drive details
 * **************************** */
async function addTestDriveDetails(tdc_date, tdc_time, tdc_fullname, tdc_cellphone,tdc_make_model) {
    try {
        const sql = "INSERT INTO tdclients (tdc_date, tdc_time, tdc_fullname, tdc_cellphone,tdc_make_model) VALUES ($1, $2, $3, $4, $5)"
        return await pool.query(sql, [tdc_date, tdc_time, tdc_fullname, tdc_cellphone,tdc_make_model])
    } catch (error) {
        return error.message
    }
}

module.exports = {addClassification, addInventory, addTestDriveDetails}