const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.registerValidate = async (req, res) => {

    req.checkBody({
        'first_name': {
            notEmpty: true,
            errorMessage: 'Username is required',
            escape: true,
        },
    })
}
