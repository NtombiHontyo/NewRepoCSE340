const utilities = require("../utilities/index")
const accountModel = require("../models/account-module")
const bcrypt = require("bcryptjs")


/* **************
 * Deliver login view
 * ************* */
async function displayaccountLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
        errors: null,
    })
}

/* ******************
 * Deliver regisration view
 * ***************** */
async function buildRegistration(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    })
}

/* ***********************
 * Process Registration
 * ********************* */
 async function registerAccount(req, res){
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password} = req.body

    let hashedPassword
    try {
        //regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(account_password,10 )
    } catch (error) {
        req.flash("notice", 'Sorry, there was an error processing the registration.')
        res.status(500).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }

//The bodyParser allows the the inputs to be used as parameters in the account model function
    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        hashedPassword
    )

    if (regResult) {
        req.flash(
            "notice", 
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("account/login", {
            title: "Login",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
 }

module.exports = { displayaccountLogin, buildRegistration, registerAccount}