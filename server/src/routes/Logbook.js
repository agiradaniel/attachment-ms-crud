const express = require('express');
const { week1 } = require("../../models");
const { week2 } = require("../../models");
const { week3 } = require("../../models");
const { week4 } = require("../../models");
const { week5 } = require("../../models");
const { week6 } = require("../../models");
const { week7 } = require("../../models");
const { week8 } = require("../../models");
const { week9 } = require("../../models");
const { week10 } = require("../../models");

const router = express.Router();

//Input weekly logbook data
router.post("/", async(req, res)=>{
    
    let selectedWeek;
    
    const {week, monday, tuesday, wednesday, thursday, friday, report, creatorId} = req.body;

    if(week == "week1"){selectedWeek = week1}
    if(week == "week2"){selectedWeek = week2}
    if(week == "week3"){selectedWeek = week3}
    if(week == "week4"){selectedWeek = week4}
    if(week == "week5"){selectedWeek = week5}
    if(week == "week6"){selectedWeek = week6}
    if(week == "week7"){selectedWeek = week7}
    if(week == "week8"){selectedWeek = week8}
    if(week == "week9"){selectedWeek = week9}
    if(week == "week10"){selectedWeek = week10}

    await selectedWeek.create({
       monday, tuesday, wednesday, thursday, friday, report, creatorId
    })
    res.json("Success")
})

//retrieve logbook data
router.post("/logs", async(req, res)=>{
    
    let selectedWeek;

    const { userId } = req.body;
    const { week } = req.body;

    if(week == "week1"){selectedWeek = week1}
    if(week == "week2"){selectedWeek = week2}
    if(week == "week3"){selectedWeek = week3}
    if(week == "week4"){selectedWeek = week4}
    if(week == "week5"){selectedWeek = week5}
    if(week == "week6"){selectedWeek = week6}
    if(week == "week7"){selectedWeek = week7}
    if(week == "week8"){selectedWeek = week8}
    if(week == "week9"){selectedWeek = week9}
    if(week == "week10"){selectedWeek = week10}
    try{
    const logs = await selectedWeek.findOne({where:{creatorId: userId}, attributes:{exclude:["creatorId", "createdAt", "updatedAt"]} });
    if(logs) {res.json([logs])} else {res.json([])}
    } catch (error) {
        console.error("Error retrieving logs:", error);
    }


})

//Input comments into weekly logs
router.put("/inputcomments", async(req, res)=>{
    let selectedWeek;

    const {week, studentid, supervisorComments} = req.body;

    if(week == "week1"){selectedWeek = week1}
    if(week == "week2"){selectedWeek = week2}
    if(week == "week3"){selectedWeek = week3}
    if(week == "week4"){selectedWeek = week4}
    if(week == "week5"){selectedWeek = week5}
    if(week == "week6"){selectedWeek = week6}
    if(week == "week7"){selectedWeek = week7}
    if(week == "week8"){selectedWeek = week8}
    if(week == "week9"){selectedWeek = week9}
    if(week == "week10"){selectedWeek = week10}

    const record = await selectedWeek.findOne({where:{creatorId: studentid}});
    await record.update({fieldSupervisorComments: supervisorComments})
    res.json("Comment added successfully");
})

//Approve weekly logs
router.put("/approveweek", async(req, res)=>{
    let selectedWeek;

    const {week, studentid, approvalStatus} = req.body;

    if(week == "week1"){selectedWeek = week1}
    if(week == "week2"){selectedWeek = week2}
    if(week == "week3"){selectedWeek = week3}
    if(week == "week4"){selectedWeek = week4}
    if(week == "week5"){selectedWeek = week5}
    if(week == "week6"){selectedWeek = week6}
    if(week == "week7"){selectedWeek = week7}
    if(week == "week8"){selectedWeek = week8}
    if(week == "week9"){selectedWeek = week9}
    if(week == "week10"){selectedWeek = week10}

    const record = await selectedWeek.findOne({where:{creatorId: studentid}});
    await record.update({approvalStatus})
    res.json("Approval successfull");
})

module.exports = router;