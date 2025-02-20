const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/AuthValidate");
const logger = require("../config/logger");
const { successResponse, errorResponse } = require("../schema/response");

router.get("/", (req, res) => {
  logger.info(`Masuk Home ${req.reqId}`, { reqId: req.reqId });
  // Log the request and elapsed time
  logger.info(
    `Request processed successfully`,
    { reqId: req.reqId }
  );

  const data = {
    pesan: "hello world",
    data: [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ],
  };
  successResponse(res, 200, data, "Resource fetched successfully", req.reqId);
});

module.exports = router;
