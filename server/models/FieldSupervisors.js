const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const FieldSupervisors = sequelize.define("FieldSupervisors",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "Field Supervisor"
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        approvalStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    return FieldSupervisors
}