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

//Route to build the account manager
router.get("/", utilities.checkLogin ,utilities.handleErrors(accountController.displayAccManager))

//Route to send data to server
router.post(
    "/register", 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

//Process for login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    utilities.handleErrors(accountController.accountLogin)
)    

module.exports = router