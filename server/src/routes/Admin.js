const express = require("express");
const { Users } = require("../../models");
const { AcademicSupervisors } = require("../../models");
const { FieldSupervisors } = require("../../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");


router = express.Router();

//user login : inc password verification and token generation
router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const user = await AcademicSupervisors.findOne({where:{email:email}});
    if(!user) res.json({error:"User doesn't exist"})
    bcrypt.compare(password, user.password).then(async (match) => {
        if(!match) res.json({error: "Wrong Username And Password Combination"})
        const accessToken = sign(
            {username:user.username, id: user.id},
            "mysecret"
        );
        res.json({token: accessToken, username: user.username, id:user.id})
    })
})

//Retrieve students data
router.get("/studentdata", async (req, res)=>{

    const studentDetails = await Users.findAll({
        attributes: ["id","username", "phone", "company", "location", "supervisorName", "fSupervisorName", "assessmentDate"]
    })
    res.json(studentDetails)
})

//Retrieve list of academic supervisors
router.get("/academicsupervisors", async (req, res)=>{
    const academicSupervisorDetails = await AcademicSupervisors.findAll({
        attributes: ["id", "name"]
    })
    res.json(academicSupervisorDetails)
})

//Retrieve list of Field supervisors
router.get("/fieldsupervisors", async (req, res)=>{
    const fieldSupervisorDetails = await FieldSupervisors.findAll({
        attributes: ["id", "name"]
    })
    res.json(fieldSupervisorDetails)
})

//Retrieve list of Field supervisors where approval = false
router.get('/unapprovedfieldsupervisors', async (req, res)=>{
    const details = await FieldSupervisors.findAll({
        where: {approvalStatus: false},
        attributes: ["id", "name", "phone", "company"]
    })
    res.json(details);
})

//Update approval status of field supervisors
router.put('/approvesupervisors', async (req, res)=>{
    const {id, approvalStatus} = req.body;
    const supervisorDetails = await FieldSupervisors.findOne({where:{id:id}})
    await supervisorDetails.update({approvalStatus});
    res.json("Supervisor approved");
})

//Update students academic supervisor
router.put("/updateacademicsupervisor", async(req, res)=>{
    const {studentId, supervisorName, supervisorId} = req.body;
    const studentDetails = await Users.findOne({where:{id:studentId}})
    await studentDetails.update({supervisorName, supervisorId});
    res.json("Supervisor updated successfully")
})

//Update students Field supervisor
router.put("/updatefieldsupervisor", async(req, res)=>{
    const {studentId, fSupervisorName, fSupervisorId} = req.body;
    const studentDetails = await Users.findOne({where:{id:studentId}})
    await studentDetails.update({fSupervisorName, fSupervisorId});
    res.json("Supervisor updated successfully")
})

module.exports = router;