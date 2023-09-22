const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const studentMarks = sequelize.define("studentMarks",{
        studentName: {
            type: DataTypes.STRING,
        },
        punctuality: {
            type: DataTypes.INTEGER,
        },
        adherence: {
            type: DataTypes.INTEGER,
        },
        workmanship: {
            type: DataTypes.INTEGER,
        },
        workOutput: {
            type: DataTypes.INTEGER,
        },
        adaptability: {
            type: DataTypes.INTEGER,
        },
        communication: {
            type: DataTypes.INTEGER,
        },
        reliability: {
            type: DataTypes.INTEGER,
        },
        teamwork: {
            type: DataTypes.INTEGER,
        },
        totalMarks: {
            type: DataTypes.INTEGER,
        },
        studentId: {
            type: DataTypes.INTEGER
        }
    })
    return studentMarks
}