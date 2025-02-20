const jwt = require('jsonwebtoken');

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    // Dekode JWT untuk mendapatkan user ID
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");

    // Cek expiration time di database
    const jwtToken = await JwtToken.findOne({
      where: { userId: decoded.userId, jwt_token: token },
    });
    if (!jwtToken || jwtToken.expiration_time < new Date()) {
      return res.sendStatus(401); //Unauthorized
    }

    req.user = decoded; // tambahkan user ke request object
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
};

module.exports = authenticateJWT;

