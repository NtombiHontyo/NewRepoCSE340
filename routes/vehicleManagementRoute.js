//Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const vehicleManagementController = require("../contollers/vehicleManagementController")
const classValidate = require('../utilities/vm-validation')

//Route to build addClassification view
router.get("/classification",utilities.handleErrors(vehicleManagementController.buildClassificationForm))

//Route to build inventory form view
router.get("/addinventory",utilities.handleErrors(vehicleManagementController.buildInventoryForm))
//Route to process classification form
router.post(
    "/classification", 
    classValidate.classificationRules(),
    classValidate.checkclassData,
    utilities.handleErrors(vehicleManagementController.addClassification))


//Route to process inventory Form
router.post(
    "/addinventory", 
    classValidate.addInventoryRules(),
    classValidate.checkInvData,
    utilities.handleErrors(vehicleManagementController.addInventory))

//Route to deliver test drive page/form
router.get("/test",utilities.handleErrors(vehicleManagementController.buildTestDriveForm))    

//Route to process test drive Form
router.post(
    "/test", 
    classValidate.addTestDriveDataRules(),
    classValidate.checkTdData,
    utilities.handleErrors(vehicleManagementController.addTestDriveDetails))

module.exports = router