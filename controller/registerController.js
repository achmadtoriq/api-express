const logger = require("../config/logger");
const User = require("../models/user");
const { successResponse, errorResponse } = require("../schema/response");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input (disesuaikan dengan kebutuhan)
    if (!username || !password || !email) {
      return errorResponse(res, 400, "Email, Username dan password wajib diisi", [{ message: "Email, Username dan password wajib diisi" }], req.reqId, req.elapsedTimeMs);
    }

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 400, "Email sudah terdaftar", [{ message: "Email sudah terdaftar" }], req.reqId, req.elapsedTimeMs);
    }

    // Buat user baru
    const newUser = await User.create({ username, email, password });

    logger.info(`User baru terdaftar: ${newUser.username}`, { reqId: req.reqId });
    successResponse(res, 201, newUser, "User berhasil terdaftar", req.reqId, req.elapsedTimeMs);
  } catch (error) {
    errorResponse(res, 500, "Internal Server Error", [{ message: error.message }], req.reqId, req.elapsedTimeMs);
  }
};

module.exports = registerController;
