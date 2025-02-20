const express = require("express");
const router = express.Router();
const { getListArticle, createArticle, updateArticle } = require("../../controller/Article/ArticleController");
// const { upload } = require("../../middleware/UploadImageValidation");

router.post("/", createArticle)
router.get("/", getListArticle);
router.get('/:slug', getListArticle)
router.put('/:slug', updateArticle)


module.exports = router;
