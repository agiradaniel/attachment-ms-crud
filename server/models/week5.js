const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const week5 = sequelize.define("week5",{
        monday: {
            type: DataTypes.STRING,
        },
        tuesday: {
            type: DataTypes.STRING,
        },
        wednesday: {
            type: DataTypes.STRING,
        },
        thursday: {
            type: DataTypes.STRING,
        },
        friday: {
            type: DataTypes.STRING,
        },
        report: {
            type: DataTypes.STRING,
        },
        creatorId: {
            type: DataTypes.INTEGER,
        },
        fieldSupervisorComments: {
            type: DataTypes.STRING,
        },
        approvalStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return week5
}