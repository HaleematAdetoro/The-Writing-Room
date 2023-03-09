const express = require("express");
const articleController = require("../controllers/articleController");


const  ArticleRouter = express.Router();


ArticleRouter.get("/", articleController.getAllArticles);




module.exports = ArticleRouter
