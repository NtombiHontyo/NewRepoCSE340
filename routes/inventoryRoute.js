// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../contollers/invController")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build detail view for each vehicle
router.get("/detail/:vehicle_inv_id", invController.buildByInvId)


module.exports = router