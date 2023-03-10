
const {Model} = require('sequelize');
const Article = require('./articles')


module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({Article}) {
            this.hasMany(Article, {
                foreignKey: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            });
            
        }
    
    };

    User.init({
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
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User'
    });


    return User;

    // Article.belongsToOne(User);
};


