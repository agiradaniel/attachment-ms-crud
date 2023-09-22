const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "student"
        },
        fSupervisorName: {
            type: DataTypes.STRING,
        },
        fSupervisorId: {
            type: DataTypes.STRING,
        },
        supervisorName: {
            type: DataTypes.STRING,
        },
        supervisorId: {
            type: DataTypes.STRING,
        },
        assessmentDate: {
            type: DataTypes.DATEONLY,
        },
        progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        progressNeg: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        approvalStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    return Users
}