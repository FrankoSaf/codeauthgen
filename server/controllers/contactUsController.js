    // contact us send emails
const {sendContactUsEmail} = require('../models/Email')

const contactUsController = (req, res) =>{

    sendContactUsEmail(req.body)
    .then(data=>{
        res.json({
            mailSent: true
        })
    })
    .catch(err=>{
        res.json({
            mailSent: false
        })
    })

}

module.exports =  contactUsController