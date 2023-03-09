module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    })

    Comment.associate = function (models) {
        Comment.belongsTo(models.users);
        Comment.belongsTo(models.articles);
    };
    return Comment;
}