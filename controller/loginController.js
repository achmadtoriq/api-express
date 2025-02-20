const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const logger = require("../config/logger");
const { errorResponse, successResponse } = require("../schema/response");
const JwtToken = require("../models/jwtToken");
const User = require("../models/user");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verifikasi kredensial
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse(
        res,
        401,
        "User Tidak Ditemukan",
        [{ message: "User Tidak Ditemukan" }],
        req.reqId,
        req.elapsedTimeMs
      );
    }

    if (!(await user.comparePassword(password))) {
      return errorResponse(
        res,
        401,
        "Password Salah",
        [{ message: "Password Salah" }],
        req.reqId,
        req.elapsedTimeMs
      );
    }

    const tokenExist = await JwtToken.findOne({ where: { user_id: user.id } });

    if (tokenExist) {
      return successResponse(res,
        200,
        { email: user.email, token: tokenExist.jwt_token, expiration_time: moment(tokenExist.expiration_time).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss") },
        "Token Sudah ada",
        req.reqId,
        req.elapsedTimeMs)
    }

    logger.info(`User ${user.username} logged in`, { reqId: req.reqId });

    // 2. Buat JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, "K3ikoS3cr3t", { expiresIn: "1h" });

    // 3. Simpan waktu kadaluarsa di database
    const expirationTime = moment().add(1, "hour").tz("Asia/Jakarta").toDate();
    await JwtToken.create({
      user_id: user.id,
      jwt_token: token,
      expiration_time: expirationTime,
    });

    const data = {
      email: user.email,
      token: token,
      expiration_time: moment(expirationTime)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss"),
    };

    successResponse(
      res,
      200,
      data,
      "Login successful",
      req.reqId,
      req.elapsedTimeMs
    );
  } catch (error) {
    errorResponse(
      res,
      500,
      "Internal Server Error",
      [{ message: error.message }],
      req.reqId,
      req.elapsedTimeMs
    );
  }
};

module.exports = loginController;
