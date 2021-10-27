const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {

    const errors = validationResult(req); //errors from check in controllers

    //if errors are not empty return...
    if ( !errors.isEmpty()){
        return res.status(400).json({ 
            ok: false,
            errors: errors.mapped()
        })
    }
    // if the if is executed it never reaches the next
    next();
}

module.exports = {
    validateFields
}