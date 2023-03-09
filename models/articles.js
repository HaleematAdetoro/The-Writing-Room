const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        static associate({Comment}) {
            this.belongsTo(User, {foreignKey: 'userID', as: 'users'})
            this.hasMany(Comment, {foreignKey: 'articleId', as: 'comments'})
        }
    };

    Article.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'articles',
        modelName: 'Article',
    });
        return Article;
};  
    // const Article = sequelize.define("Article", {
    //     id: {
    //         type: DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true
    //     },
    //     title: {
    //         type: DataTypes.STRING,
    //         allowNull: false
    //     },
    //     body: {
    //         type: DataTypes.STRING,
    //         allowNull: false
    //     }
    // }, {
    //     tableName: 'articles',
    // })

    // class Article extends Model {
    //     static associate({comments}) {
    //         this.hasMany(comment, {foreignKey: 'articleId', as: 'comments'})
    //     }
    // }
    // Article.associate = function (models) {
    //     Article.hasMany(models.comments, {
    //         onDelete: "CASCADE",
    //     });
    //     Article.belongsTo(models.users)
    // };

