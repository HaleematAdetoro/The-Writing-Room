const express = require("express");
const articleController = require("../controllers/articleController");


const  ArticleRouter = express.Router();


ArticleRouter.get("/", articleController.getAllArticles);
ArticleRouter.get("/:id", articleController.getArticleById);
ArticleRouter.post("/", articleController.createArticle);
ArticleRouter.put("/:id", articleController.updateArticleById);
ArticleRouter.delete("/:id", articleController.deleteArticleById);





module.exports = ArticleRouter
