const express =  require("express");
const { Announcements } = require("../../models");

const router = express.Router();

router.post("/", async(req, res)=>{
    const {Announcement, creatorId} = req.body;
    const today = new Date();
    const dateCreated = today.toISOString().substring(0, 10);

    await Announcements.create({
        Announcement,
        dateCreated,
        creatorId    
    })
    res.json("Announcement inserted successfully")
})


router.get("/", async(req, res)=>{
    const listOfAnnouncements = await Announcements.findAll({attributes: ["Announcement", "dateCreated"]});
    res.json(listOfAnnouncements)
})


module.exports = router;