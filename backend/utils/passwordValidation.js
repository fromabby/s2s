const passwordValidator = require('password-validator')

const passVal = new passwordValidator()

{
    passVal
    .is().min(8) 
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
}


module.exports = passVal