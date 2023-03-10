const express = require("express");
const commentController = require("../controllers/commentController");


const commentRouter = express.Router();


commentRouter.get("/", commentController.getAllCommentsByArticle);
// commentRouter.get("/:id", commentController.getArticleById);
commentRouter.post("/", commentController.createComment);
commentRouter.put("/:id", commentController.updateCommentById);
commentRouter.delete("/:id", commentController.deleteCommentById);





module.exports = commentRouter