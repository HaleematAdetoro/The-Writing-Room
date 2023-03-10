const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate ({Article}) {
            Comment.belongsTo(Article, {
                onDelete: "CASCADE",
            })
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
        content: {
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
    // Article.hasMany(Comment, {
    //     onDelete: "CASCADE"
    // })
    // // Comment.belongsTo(Article, {
    //     onDelete: "CASCADE",
    // })
}








