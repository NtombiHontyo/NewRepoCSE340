const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* *******************************
 * Build inventory by classification view
 * ****************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
       title: className + " vehicles",
       nav,
       grid, 
    })
}

invCont.buildByInvId = async function (req, res, next) {
    const inv_id = req.params.vehicle_inv_id
    const data = await invModel.getInvDetails(inv_id)
    const detail = await utilities.buildDetailPage(data)
    let nav = await utilities.getNav()
    res.render("./inventory/details", {
        title: "Details",
        nav,
        detail
    })
}

//Build Vehicle Management Page
invCont.buildVehicleManagement = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav
    })
}

module.exports = invCont