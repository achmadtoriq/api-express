const { errorResponse } = require("../schema/response");

const requestValidate = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request",
        errors: { path: error.details[0].path[0], message: error.details[0].message },
        reqId: req.reqId,
        elapsedTime: `${req.elapsedTimeMs.toFixed(2)}ms`,
      });
    }

    next();
  };
};

module.exports = requestValidate;
