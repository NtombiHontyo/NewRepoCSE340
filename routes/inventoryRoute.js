// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../contollers/invController")
const utilities = require("../utilities/index")
const classValidate = require('../utilities/vm-validation')
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build detail view for each vehicle
router.get("/detail/:vehicle_inv_id", invController.buildByInvId)

//Route used in JavaScript file
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Route to deliver view for editing/updating an inventory item
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildInvItemUpdateForm))

//Route to process the updated form
router.post("/update/", 
    classValidate.addInventoryRules(),
    classValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory))

//Route to deliver the delete confirmation page
router.get("/delete/:inv_id", utilities.handleErrors(invController.buildInvItemDeleteConfPage))

//Route to process the deletion process
router.post("/delete/", 
    utilities.handleErrors(invController.deleteInventory))



module.exports = router