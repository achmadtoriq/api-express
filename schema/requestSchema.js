const Joi = require('joi');

// Define a Joi schema for login validation
const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
  }),
});

// Define a Joi schema for register validation
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "A valid email is required",
    "string.empty": "Email is required",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};