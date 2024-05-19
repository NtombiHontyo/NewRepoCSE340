const invModel = require("../models/inventory-model")
const Util = {}

/* **********************
* Constructs the nav HTML unordered list
************************ */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul id='nav_ul'>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list += 
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name + 
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}



/* *************************** 
 * Build the classification view HTML
 * ************************* */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
        grid += '<a href="../../inv/detail/'+ vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' detail"><img src="' + vehicle.inv_thumbnail
        +'" alt="Image of ' + vehicle.inv_make + ' '+ vehicle.inv_model
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
        })
        grid += '</ul'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

Util.buildDetailPage = async function(data){
    let detail
    data.rows.forEach((row) => {
        detail = '<h2>'
        detail += row.inv_year + ' ' + row.inv_make + ' '+ row.inv_model
        detail += '</h2>'
        detail += '<section class="veh_det">'
        detail += '<div class="align">'
        detail += '<img class="datailimages" src="' + row.inv_image + '" alt="Image of ' + row.inv_make + ' ' + row.inv_model + '">'
        detail += '</div>'
        detail += '<div>'
        detail += '<h3 class="sub_heading">'
        detail += row.inv_make + ' '+ row.inv_model +' Details'
        detail += '</h3>'
        detail += '<div class="div-cont">'
        detail += '<h3 class="price"> Price: ' 
        detail += '<span>$'
        + new Intl.NumberFormat('en-US').format(row.inv_price) + '</span>'
        detail += '</h3>'
        detail += '<p>'
        detail += '<h3 id="inline"> Description:  </h3>' + ' '
        detail += row.inv_description
        detail += '</p>'
        detail += '<p>'
        detail += '<h3 id="inlines"> Color: </h3>' +' '
        detail += row.inv_color
        detail += '</p>'
        detail += '<p>'
        detail += '<h3 id="inliness"> Miles: </h3>' +' '
        detail += '<span>'
        + new Intl.NumberFormat('en-US').format(row.inv_miles) + '</span>'
        detail += '</p>'
        detail += '</div>'
        detail += '</div>'
        detail += '</section>'
    })
    return detail
}

/* *********************************
 * Build Classification dropdown menu selection
 * ********************************* */
Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let  classificationList = '<select name="classification_id" id="classificationList" required value="<%= locals.classification_id >'
        classificationList += "<option value=''>Choose a Classification</option>"
        data.rows.forEach((row) => {
            classificationList += '<option value="' + row.classification_id + '"'
            if (
                classification_id != null &&
                row.classification_id == classification_id
            ) {
                classificationList += " selected "
            }
            classificationList += ">" + row.classification_name + "</option>"
        })
        classificationList += "</select>"
        return classificationList
}



/* ************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 ************************* */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util
