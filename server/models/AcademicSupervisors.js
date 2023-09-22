const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const AcademicSupervisors = sequelize.define("AcademicSupervisors",{
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
            defaultValue: "Academic Supervisor"
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return AcademicSupervisors
}