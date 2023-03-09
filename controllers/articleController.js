const db = require('../models')

const Article = db.articles;


async function getAllArticles(req, res) {
    try{
        const articles = await Article.findAll();
        res.status(200).json(articles)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function createArticle(req, res) {
    
}




module.exports = {
    getAllArticles
}