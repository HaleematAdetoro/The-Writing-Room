;
const db = require('../models')

const Article = db.sequelize.models.Article;
const User = db.sequelize.models.User;
const Comment = db.sequelize.models.Comment;


async function getAllArticles(req, res) {
    try{
        const articles = await Article.findAll({
            include: [Comment],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(articles)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getArticleById(req,res) {
    try {
        const article = await Article.findByPk(req.params.id)
        res.status(200).json(article)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function createArticle(req, res) {
   
    const { title, body, userID } = req.body;
    try {
        const article = await Article.create({ title, body, UserId: userID  })
        res.status(200).json({
            message: "Article created successfully",
            data: article
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function updateArticleById(req, res) {
   
    const {articleInfo, userID} = req.body;
    try {
        const article = await Article.findOne({
            where: {id: req.params.id, UserId: userID}
        });
        if (article) {
            await article.update(articleInfo);
            res.status(200).json({
                message: "article updated successfully",
                data: article
            })
        } else {
            res.status(404).json({
                message: "You cannot update article"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


async function deleteArticleById(req, res) {
    const {userID} = req.body;
    try {
        const article = await Article.findOne({
            where: {id: req.params.id, UserId: userID} 
        })
        if (article) {
            await article.destroy();
            res.status(200).json({
                message: "article deleted successfully",
            })
        } else {
            res.status(404).json({
                message: "You cannot delete article"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticleById,
    deleteArticleById
}