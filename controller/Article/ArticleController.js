const { default: slugify } = require("slugify");
const logger = require("../../config/logger");
const Article = require("../../models/artikel/Article");
const { successResponse, errorResponse } = require("../../schema/response");
const moment = require('moment-timezone');

const getListArticle = async (req, res) => {
  try {
    let filter = {} 
    if (req.params.slug) {
      filter = {
        where: {
          slug: req.params.slug,
        }
      }
    }

    const articles = await Article.findAndCountAll(filter);
    successResponse(res, 200, articles, "Sukses Get List", req.reqId);
  } catch (error) {
    logger.error(`${error.message}`, { reqId: "Article Controller" });
    res.status(400).send(`Error: ${error.message}`);
  }
};

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  
  try {
    const slug = slugify(title, { lower: true, strict: true });    
    const waktu = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
    const article = await Article.create({
      title,
      slug,
      content,
      author,
      waktu
    });
    successResponse(res, 201, article, "Sukses Create Article", req.reqId);
  } catch (error) {
    console.log(error);
    
    errorResponse(res, 500, "Gagal Create Article", [], req.reqId)
  }
};

const updateArticle = async (req, res) => {
  const { title, content, author } = req.body;
  
  try {
    const articles = await Article.findOne({ where: { slug: req.params.slug}});
    
    if(articles){
      const slug = slugify(title, { lower: true, strict: true });       
      articles.title = title;
      articles.slug = slug;
      articles.content = content;
      articles.author = author;

      await articles.save();
    }

    // const articles = await Article.findAndCountAll(filter);
    successResponse(res, 200, articles, "Sukses Update Data", req.reqId);
  } catch (error) {
    logger.error(`${error.message}`, { reqId: "Article Controller" });
    res.status(400).send(`Error: ${error.message}`);
  }
}

module.exports = { getListArticle, createArticle, updateArticle };
