const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate ({Article}) {
            this.belongsTo(User, {foreignKey: 'userId', as: 'users'})
            this.belongsTo(Article, {foreignKey: 'articleId', as: 'articles'})
        }
    };

    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'comments',
        modelName: 'Comment',
    });
    return Comment;
}








