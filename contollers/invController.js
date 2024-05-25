const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const insertInvModel = require('../models/vehicleManagement-module')

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
    const classificationList = await utilities.buildClassificationList()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        classificationList
    })
}

/* ***********************
 * Return Inventory by Classification As JSON
 * ********************** */
invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await invModel.getInventoryByClassificationId(classification_id)
    if (invData[0].inv_id) {
        return res.json(invData)
    } else {
        next(new Error("No data returned"))
    }
}


/* ******************
 * Deliver pre-filled update inventory Form
 * ***************** */
invCont.buildInvItemUpdateForm = async function(req, res, next) {
    const invId = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const data = await invModel.getInvDetails(invId)
    let classificationList = await utilities.buildClassificationList(data.classification_id)
    const name = `${data.inv_make} ${data.inv_model}`
    res.render("./inventory/edit-inventory", {
        title: "Edit " + name,
        nav,
        classificationList: classificationList,
        errors: null,
        inv_id: data.inv_id,
        inv_make: data.inv_make,
        inv_model: data.inv_model,
        inv_year: data.inv_year,
        inv_desc: data.inv_description,
        inv_image: data.inv_image,
        inv_thumbnail: data.inv_thumbnail,
        inv_price: data.inv_price,
        inv_miles: data.inv_miles,
        inv_color: data.inv_color,
        classification_id: data.classification_id
    })
}

module.exports = invCont