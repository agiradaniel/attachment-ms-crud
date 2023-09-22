const express = require('express');
const { studentMarks } = require("../../models");
const { studentMarksAS } = require("../../models");

const router = express.Router();

//Field supervisor marks assignment
router.post("/", async (req, res) => {

    const {name, punctuality, adherence, workmanship, workOutput, adaptability, communication, reliability, teamwork, marks, studentid} = req.body;

    await studentMarks.create({
            studentName: name,
            punctuality,
            adherence,
            workmanship,
            workOutput,
            adaptability,
            communication,
            reliability,
            teamwork,
            totalMarks: marks,
            studentId: studentid
    })
    res.json("Marks set successfully")

})

//field supervisor marks retrieval
router.post("/studentmarks", async (req, res)=>{
    const {studentid} = req.body;
    const marksData = await studentMarks.findOne({where:{studentId: studentid}, attributes:{exclude:["createdAt","updatedAt"]}});
    res.json([marksData]);
})

//Academic supervisor marks assignment
router.post("/academicsupervisor", async(req, res)=>{
    const {name, adherence, presentation, evidence, organizational, mandate, general, activity, penalty, marks, studentid} = req.body;

    await studentMarksAS.create({
        studentName: name,
        adherence,
        presentation,
        evidence,
        organizational,
        mandate,
        general,
        activity,
        penalty,
        totalMarks: marks,
        studentId: studentid
})
res.json("Marks set successfully")

})

//Academic supervisor marks retrieval
router.post("/studentmarksas", async (req, res)=>{
    const {studentid} = req.body;
    const marksData = await studentMarksAS.findOne({where:{studentId: studentid}, attributes:{exclude:["createdAt","updatedAt"]}});
    res.json([marksData]);
})

module.exports = router;