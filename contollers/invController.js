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
    const titleName = data[0].inv_make
    res.render("./inventory/details", {
        title: "Details " + titleName,
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
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemdata = await invModel.getInvDetails(inv_id)
    const classificationList = await utilities.buildClassificationList(itemdata[0].classification_id)
    const itemname = `${itemdata[0].inv_make} ${itemdata[0].inv_model}`
    res.render("./inventory/edit-inventory", {
        title: "Edit " + itemname,
        nav,
        classificationList: classificationList,
        errors: null,
        inv_id: itemdata[0].inv_id,
        inv_make: itemdata[0].inv_make,
        inv_model: itemdata[0].inv_model,
        inv_year: itemdata[0].inv_year,
        inv_description: itemdata[0].inv_description,
        inv_image: itemdata[0].inv_image,
        inv_thumbnail: itemdata[0].inv_thumbnail,
        inv_price: itemdata[0].inv_price,
        inv_miles: itemdata[0].inv_miles,
        inv_color: itemdata[0].inv_color,
        classification_id: itemdata[0].classification_id
    })
}

/* ***********************
 * Process update of inventory item
 * ********************* */
invCont.updateInventory = async function (req, res, next){
    let nav = await utilities.getNav()
    const { 
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
        } = req.body
    const updateResult = await invModel.updateInventory(
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
    
    )
    if (updateResult) {
        const itemname = updateResult.inv_make + " " + updateResult.inv_model
        req.flash(
            "notice", 
            `The ${itemname} was successfully updated.`
        )
        res.redirect("/inv/")
        
    } else {
        const classificationList = await utilities.buildClassificationList(classification_id)
        const itemname = `${inv_make} ${inv_model}`
        req.flash("notice", "Sorry, the insert failed.")
        res.status(501).render("inventory/edit-inventory", {
            title: "Edit " + itemname,
            nav,
            classificationList: classificationList,
            errors: null,
            inv_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image, 
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id
        })
    }
 }

 /* ******************
 * Deliver pre-filled delete inventory Form
 * ***************** */
invCont.buildInvItemDeleteConfPage = async function(req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemdata = await invModel.getInvDetails(inv_id)
    const itemname = `${itemdata[0].inv_make} ${itemdata[0].inv_model}`
    res.render("./inventory/delete-confirm", {
        title: "Delete " + itemname,
        nav,
       // classificationList: classificationList,
        errors: null,
        inv_id: itemdata[0].inv_id,
        inv_make: itemdata[0].inv_make,
        inv_model: itemdata[0].inv_model,
        inv_year: itemdata[0].inv_year,
        inv_price: itemdata[0].inv_price,
    })
}


/* ***********************
 * Process deletion of inventory item
 * ********************* */
invCont.deleteInventory = async function (req, res, next){
   // let nav = await utilities.getNav()
    const {inv_id} = req.body
    const deleteResult = await invModel.deleteInventory(inv_id)
    if (deleteResult) {
      //  const itemname = deleteResult.inv_make + " " + deleteResult.inv_model
        req.flash(
            "notice", 
            "The vehicle was successfully deleted."
        )
        res.redirect("/inv/")
        
    } else {
       // const itemname = `${inv_make} ${inv_model}`
        req.flash("notice", "Sorry, the deletion failed.")
        res.redirect("/delete/:inv_id")
    }
 }

 

module.exports = invCont