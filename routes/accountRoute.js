//Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../contollers/accountController")
const regValidate = require('../utilities/account-validation')

//Route to build account view
router.get("/login",utilities.handleErrors(accountController.displayaccountLogin))

//Route to build registration route
router.get("/register", utilities.handleErrors(accountController.buildRegistration))

//Route to send data to server
router.post(
    "/register", 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

module.exports = router