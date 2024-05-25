const utilities = require("../utilities/index")
const accountModel = require("../models/account-module")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



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
/* **********************
 * Deliver account management view
 * ********************** */
async function displayAccManager(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/accmanager", {
        title: "Account Manager",
        nav,
      //  errors: null
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


/* **********************
 * Process login request
 * ********************* */
async function accountLogin(req, res) {
    let nav = utilities.getNav()
    const { account_email, account_password} = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
        req.flash("notice", "Please check your credentials and try again.")
        res.status(400).render("account/login", {
            title:"Login",
            nav,
            error: null,
            account_email
        })
        return
    }
    try {
        if (await bcrypt.compare(account_password, accountData.account_password)) {
            delete accountData.account_password
            const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600}) 
            if (process.env.NODE_ENV === 'development') {
                res.cookie("jwt", accessToken, {httpOnly: true, maxAge: 3600 * 1000})//'jwt' is the name of the cookie
            } else {
                res.cookie("jwt", accessToken, {httpOnly: true, secure: true, maxAge: 3600 * 1000})//in deployment must onyl use HTTPS and not HTTP
            }
            return res.redirect("/account")
        } 
    }catch (error) {
        return new Error('Access Forbidden')
    }
}


module.exports = { displayaccountLogin, buildRegistration, displayAccManager, registerAccount, accountLogin}