const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const { AcademicSupervisors } = require("../../models");
const {sign} = require("jsonwebtoken");

router = express.Router();

//Academic Supervisor registration

router.post("/register", (req, res) => {
    const {name, password, email, phone, institution, workId} = req.body;
    try{
    bcrypt.hash(password, 10).then((hash)=>{
        AcademicSupervisors.create({
            name,
            password: hash,
            email,
            phone,
            institution,
            workId
        })
        res.json("Academic Supervisor created successfully")
    })
}catch(err){
    res.json(err)
}
})

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
router.post("/studentdata", async (req, res)=>{
    const {supervisorid} = req.body;
    const studentDetails = await Users.findAll({
        where: {supervisorId: supervisorid}, 
        attributes: ["id","username", "phone", "company", "location", "assessmentDate"]
    })
    res.json(studentDetails)
})

//Approve and terminate session
router.put("/approve", async (req, res)=>{
    const {studentid, approvalStatus} = req.body;

    const record = await Users.findOne({where:{id: studentid}, attributes:{exclude:["password"]}});
    await record.update({approvalStatus: approvalStatus})

    res.json("approval successfull");
})

//Set assessment date
router.put("/setdate", async (req, res)=>{

    const {studentid, assessmentDate} = req.body;

    const student = await Users.findOne({where:{id: studentid}});
    await student.update({assessmentDate})

    res.json("Date set");
})

module.exports = router;