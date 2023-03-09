module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("Article", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'articles',
    })

    Article.associate = function (models) {
        Article.hasMany(models.comments, {
            onDelete: "CASCADE",
        });
        Article.belongsTo(models.users)
    };
    return Article
}