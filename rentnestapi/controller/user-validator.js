const Joi = require('joi');



const register = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required(),

})
const signIn = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

module.exports = {
    register,
    signIn
}