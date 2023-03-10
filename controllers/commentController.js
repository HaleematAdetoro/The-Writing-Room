const { sequelize } = require('../models');
const db = require('../models')

const Article = db.articles;
const User = db.users;
const Comment = db.comments;

async function getAllCommentsByArticle(req, res) {
    const { articleID } = req.body
    try{
        const article = await Article.findOne({
            where: {id: articleID},
            
        })
        const comments = await Comment.findAll({
            where: { 
                articleId: articleID,
            },
        });
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


async function deleteCommentById(req, res) {
    const {userID} = req.body;
    try {
        const comment = await Comment.findOne({
            where: {id: req.params.id, userId: userID} 
        })
        if (comment) {
            await comment.destroy();
            res.status(200).json({
                message: "comment deleted successfully",
            })
        } else {
            res.status(404).json({
                message: "You cannot delete comment"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


async function createComment(req, res) {
    const { content, articleID, userID } = req.body;
    try {
        // const user = await User.findOne({
        //     where: {id: userID}
        // })
        // const article = await Article.findOne({
        //     where: {id: articleID}
        // })
        const comment = await Comment.create({ content, articleId: articleID, userId: userID})
        res.status(200).json({
            message: "comment created successfully",
            data: comment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function updateCommentById(req, res) {

    
    const {userID, commentInfo} = req.body;
    try {
        const comment = await Comment.findOne({
            where: {id: req.params.id, userId: userID}
        });
        if (comment) {
            await comment.update(commentInfo);
            res.status(200).json({
                message: "comment updated successfully",
                data: comment
            })
        } else {
            res.status(404).json({
                message: "You cannot update comment"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



module.exports = {
    getAllCommentsByArticle,
    createComment,
    updateCommentById,
    deleteCommentById
}