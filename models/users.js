module.exports = (sequelize, DataType) => { 

    const Users = sequelize.define('Users', { 
        id: { 
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: DataType.STRING,
            allowNull: false,
            validate: { 
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: { 
                notEmpty: true,
                isEmail: true
            }
        },
        password: { 
            type: DataType.STRING(16),
            allowNull: false,
            validate: { 
                notEmpty: true
            }
        }
    });

    Users.associate = models => { 
        Users.hasMany(models.Tasks, { 
            onDelete: 'CASCADE'
        });
    };

    return Users;
};