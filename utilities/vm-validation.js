const utilities = require(".")
    const { body, validationResult } = require("express-validator")
    const vmModel = require("../models/vehicleManagement-module")
    const validate = {}

/* *************************
 * Classification Data Validation Rules
 * ************************ */
validate.classificationRules = () => {
    return [
        //classification name is required. No spaces. No special characters
        body("classification_name")
        .trim()
        .notEmpty()
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Classification name does not meet requirements")
    ]
}

/* *************************
 * Check data and return errors or continue to add classification
 * ************************ */
validate.checkclassData = async (req, res, next) => {
    const { classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = utilities.getNav()
        res.render("inventory/addClassification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}


/* *************************
 * Inventory Data Validation Rules
 * ************************ */
validate.addInventoryRules = () => {
    return [
        //make is required and must be string
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a vehicle make name."), //on error this message is sent.

        //model is required and must be string
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle model name."), // on error this message is sent

        //Year
        body("inv_year")
        .trim()
        .notEmpty()
        .matches(/^\d{4}$/)
        .withMessage("Please provide year for the vehicle."), // on error this message is sent,
        

       //Description
        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle description."),

        body("inv_image")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle image path"), //on error this message is sent.

        body("inv_thumbnail")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle image thumbnail path"),
        

        body("inv_price")
        .trim()
        .notEmpty()
        .matches(/^\d+$/)
        .withMessage("Please provide price for the vehicle."), // on error this message is sent,

        body("inv_miles")
        .trim()
        .notEmpty()
        .matches(/^\d+$/)
        .withMessage("Please provide miles for the vehicle."), // on error this message is sent,

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a vehicle color"), //on error this message is sent.

        body('classification_id')
    .notEmpty()
    .withMessage('Please provide a classification')
        
    ]
}

/* *************************
 * Check data and return errors or continue to add inventory
 * ************************ */
validate.checkInvData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price,inv_miles, inv_color,classification_id} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = utilities.getNav()
        let classificationList = utilities.buildClassificationList
        res.render("inventory/addInventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationList,
            inv_make, 
            inv_model, 
            inv_year, 
            inv_description ,
            inv_image,
            inv_thumbnail,  
            inv_price,
            inv_miles, 
            inv_color,
            classification_id
        })
        return
    }
    next()
}


/* *************************
 * Check data and return errors or continue to update
 * ************************ */
validate.checkUpdateData = async (req, res, next) => {
    const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price,inv_miles, inv_color,classification_id, } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = utilities.getNav()
        let classificationList = utilities.buildClassificationList
        const itemname = `${inv_make} ${inv_model}`
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit " + itemname,
            nav,
            classificationList,
            inv_id,
            inv_make, 
            inv_model, 
            inv_year, 
            inv_description ,
            inv_image,
            inv_thumbnail,  
            inv_price,
            inv_miles, 
            inv_color,
            classification_id,
        })
        return
    }
    next()
}

/* *************************
 * Test Drive Data Validation Rules
 * ************************ */
validate.addTestDriveDataRules = () => {
    return [
        //make is required and must be string
        body("tdc_date")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a date for the test drive."), //on error this message is sent.

        //model is required and must be string
        body("tdc_time")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a time for the test drive."), // on error this message is sent

        //Year
        body("tdc_fullname")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide your full name."), // on error this message is sent,

        body("tdc_cellphone")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a cellphone number"), //on error this message is sent.

        body("tdc_make_model")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a make and model of the vehicle"),
        
    ]
}

/* *************************
 * Check data and return errors or continue to add inventory
 * ************************ */
validate.checkTdData = async (req, res, next) => {
    const { tdc_date, tdc_time, tdc_fullname, tdc_cellphone,tdc_make_model} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = utilities.getNav()
        res.render("inventory/booktestdrive", {
            errors,
            title: "Book a Test Drive",
            nav,
            tdc_date, 
            tdc_time, 
            tdc_fullname, 
            tdc_cellphone,
            tdc_make_model
        })
        return
    }
    next()
}




module.exports = validate