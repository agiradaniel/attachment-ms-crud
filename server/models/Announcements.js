const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Announcements = sequelize.define("Announcements",{
        Announcement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Announcements
}