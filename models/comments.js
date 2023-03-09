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








// module.exports = (sequelize, DataTypes) => {
//     const Comment = sequelize.define("Comment", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         comment: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         tableName: 'comments'
//     })

//     Comment.associate = function (models) {
//         Comment.belongsTo(models.user);
//         Comment.belongsTo(models.articles);
//     };
//     return Comment;
// }