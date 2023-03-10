const {Model} = require('sequelize')


module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
      
        static associate({Comment}) {
            this.belongsTo(User)
            this.hasMany(Comment, {
                foreignKey: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            })
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
        },
    },
    {
        sequelize,
        tableName: 'articles',
        modelName: 'Article',
    });
        return Article;

    // User.hasMany(Article)
    // Comment.belongsToOne(Article)
    // Article.belongsTo(User)
    // Article.hasMany(Comment, {
    //     foreignKey: {
    //         type: DataTypes.INTEGER,
    //         allowNull: false
    //     }
    // })    
};  


