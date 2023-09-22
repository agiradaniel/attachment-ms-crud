const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const studentMarksAS = sequelize.define("studentMarksAS",{
        studentName: {
            type: DataTypes.STRING,
        },
        adherence: {
            type: DataTypes.INTEGER,
        },
        presentation: {
            type: DataTypes.INTEGER,
        },
        evidence: {
            type: DataTypes.INTEGER,
        },
        organizational: {
            type: DataTypes.INTEGER,
        },
        mandate: {
            type: DataTypes.INTEGER,
        },
        general: {
            type: DataTypes.INTEGER,
        },
        activity: {
            type: DataTypes.INTEGER,
        },
        penalty: {
            type: DataTypes.INTEGER,
        },
        totalMarks: {
            type: DataTypes.INTEGER,
        },
        studentId: {
            type: DataTypes.INTEGER
        }
    })
    return studentMarksAS
}