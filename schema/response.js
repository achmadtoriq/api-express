// Success Response Template
const successResponse = (res, code, data, message = "Operation was successful", reqId, elapsedTimeMs=null) => {
    return res.status(code).json({
      status: "success",
      message: message,
      data: data,
      reqId: reqId,
      // elapsedTime: `${elapsedTimeMs.toFixed(2)}ms`,
    });
  };
  
  // Error Response Template
  const errorResponse = (res, code, message = "An error occurred", errors = [], reqId, elapsedTimeMs=null) => {
    return res.status(code).json({
      status: "error",
      message: message,
      errors: {
        code: code,
        details: errors
      },
      reqId: reqId,
      // elapsedTime: `${elapsedTimeMs.toFixed(2)}ms`,
    });
  };

  module.exports = {
    successResponse,
    errorResponse
  };