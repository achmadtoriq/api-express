require("dotenv").config();
const pkg = require("./package.json");
const express = require("express");
const logger = require("./config/logger");
const sequelize = require("./config/database");
const AuthRouter = require("./routes/authenticate");
const docRouter = require("./routes/docRouter");
const MainRouter = require("./routes/main");
const FoodRouter = require("./routes/FoodRouter");
const DummyRouter = require("./routes/DummyRouter");
const ArticleRouter = require("./routes/Article/ArticleRouter")
const GDriveAPIRoutes = require("./routes/gdrive/GDriveAPIRoutes")
const GDriveAuthRoutes = require("./routes/gdrive/gdriveOauth")
// const APITravelRoutes = require("./routes/api-travel/travel")

const requestIdMiddleware = require("./middleware/generateRequestID");

/* Model */
const calculateElapsedTime = require("./middleware/calculateElapsedTime");
const Article = require("./models/artikel/Article");

const app = express();
app.use(express.json());

app.use(requestIdMiddleware);
app.use(calculateElapsedTime);

// Simple API endpoint
app.use("/api", AuthRouter);
app.use("/docs", docRouter);
app.use("/foods", FoodRouter);
app.use("/dummy", DummyRouter);

/* Article API */
app.use("/article", ArticleRouter)

app.use(GDriveAPIRoutes)
app.use(GDriveAuthRoutes)

/* API Travel */
// app.use(APITravelRoutes)


app.use(MainRouter);

app.use("/", (req, res) => {
  res.status(200).json({
    name: pkg.name,
    author: pkg.author,
    version: pkg.version,
    description: pkg.description,
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection successful.", { reqId: "Startup" });
    await sequelize.sync();
    // await Article.sync({force: true})
    logger.info("All models were synchronized successfully.", {reqId: "Database"});
    app.listen(process.env.APP_PORT || 3000, () => {
      logger.info(
        `Service ${process.env.APP_NAME} is running on port ${
          process.env.APP_PORT || 3000
        }`,
        { reqId: "Startup" }
      );
      logger.info(
        `Swagger docs available at http://localhost:${process.env.APP_PORT}/docs/v1`
      );
    });
  } catch (error) {
    logger.error(`Failed to connect to the database: ${error}`, {
      reqId: "Error Database",
    });
  }
})();
