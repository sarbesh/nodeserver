module.exports = function (sequelize, DataType) {
    let comments = sequelize.define('comments', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataType.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        created_at: {
            type: DataType.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataType.DATE,
            allowNull: false
        }
    }, {
        tableName: 'comments',
        timestamps: true,
        underscored: true,
    });

    return comments;
}