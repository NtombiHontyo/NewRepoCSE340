const utilities = require("../utilities/index")
const vmModel = require('../models/vehicleManagement-module')
//const bcrypt = require("bcryptjs")

/* ******************
 * Deliver addClassification view
 * ***************** */
async function buildClassificationForm(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/addClassification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

/* ******************
 * Deliver Inventory Form
 * ***************** */
async function buildInventoryForm(req, res, next) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("inventory/addInventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: null
    })
}

/* ***********************
 * Process addition of Classification
 * ********************* */
async function addClassification(req, res){
    let nav = await utilities.getNav()
    const { classification_name} = req.body
    const regResult = await vmModel.addClassification(
        classification_name,
    
    )
    if (regResult) {
        req.flash(
            "notice", 
            `Congratulations, you\'re registered ${classification_name}. See navigation.`
        )
        res.status(201).render("./inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the addition of classification failed.")
        res.status(501).render("inventory/addClassification", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
 }


/* ***********************
 * Process addition of inventory item
 * ********************* */
async function addInventory(req, res){
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    const { inv_make, inv_model, inv_year, inv_description,inv_image, inv_thumbnail,  inv_price,inv_miles, inv_color,classification_id} = req.body
    const regResult = await vmModel.addInventory(
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
    
    )
    if (regResult) {
        req.flash(
            "notice", 
            `Congratulations, you\'re registered ${inv_make} ${inv_model}. See navigation.`
        )
        res.status(201).render("./inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the addition of classification failed.")
        res.status(501).render("inventory/addInventory", {
            title: "Add Inventory",
            nav,
            classificationList,
            errors: null,
        })
    }
 }

  
/* ******************
 * Deliver Test drive Form
 * ***************** */
async function buildTestDriveForm(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/booktestdrive", {
        title: "Book a Test Drive",
        nav,
        errors: null
    })
}


/* ***********************
 * Process information of Test Drive
 * ********************* */
async function addTestDriveDetails(req, res){
    let nav = await utilities.getNav()
    const { tdc_date, tdc_time, tdc_fullname, tdc_cellphone,tdc_make_model} = req.body
    const regResult = await vmModel.addTestDriveDetails(
        tdc_date,
        tdc_time,
        tdc_fullname,
        tdc_cellphone,
        tdc_make_model 
    )
    if (regResult) {
        req.flash(
            "notice", 
            `Congratulations, you have registered ${tdc_make_model} for a test drive. See you there!.`
        )
        res.status(201).render("index", {
            title: "Home",
            nav,
           // errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the test drive application failed. Please try again.")
        res.status(501).render("inventory/booktestdrive", {
            title: "Book a Test Drive",
            nav,
            errors: null,
        })
    }
 }

module.exports = {buildClassificationForm, addClassification, buildInventoryForm, addInventory, buildTestDriveForm, addTestDriveDetails}