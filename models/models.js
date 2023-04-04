 const {DataTypes} = require('sequelize');


 module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            allowNull:false,
        },
        hashedPassword: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i
            }
        } 
    });

    const Article = sequelize.define('Article', {
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
        },
    });

    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.hasOne(Article, {
        foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Article.belongsTo(User, {
        foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Article.hasMany(Comment, {
        foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Comment.belongsTo(User, {
        foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    Comment.belongsTo(Article, {
        onDelete: "CASCADE"
    })
 }