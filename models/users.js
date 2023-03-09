module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // firstname: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }, 
        // lastname: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true
        // },
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
        }, 
    }, {
        tableName: 'users',
    });
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            };
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    }
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    }
    
    User.prototype.validPassword = async (password, hash) => {
       return await bcrypt.compareSync(password, hash);
    }

    User.associate = function (models) {
        User.hasMany(models.articles);
        User.hasMany(models.comments)
    };
    
    return User;
}