const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const { FieldSupervisors } = require("../../models");
const {sign} = require("jsonwebtoken");

router = express.Router();

//Field Supervisor registration

router.post("/register", (req, res) => {
    const {name, password, email, phone, company, workId} = req.body;
    try{
    bcrypt.hash(password, 10).then((hash)=>{
        FieldSupervisors.create({
            name,
            password: hash,
            email,
            phone,
            company,
            workId,
        })
        res.json("Field Supervisor created successfully")
    })
}catch(err){
    res.json(err)
}
})

//user login : inc password verification and token generation
router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const user = await FieldSupervisors.findOne({where:{email:email}});
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

//Retrieve user details
router.post("/details", async (req,res) => {
    const {id} = req.body;
    const details = await FieldSupervisors.findByPk(id, {
        attributes:{exclude:["password", "createdAt", "updatedAt"]}
    });
    res.json([details])
})

//Retrieve students data for dashboard
router.post("/studentdata", async (req, res)=>{
    const {fsupervisorid} = req.body;
    const studentDetails = await Users.findAll({
        where: {fSupervisorId: fsupervisorid}, 
        attributes: ["id","username", "phone", "assessmentDate"]
    })
    res.json(studentDetails)
})

//Retrieve students data for student Modal
router.post("/studentdetails", async (req,res) => {
    const {studentid} = req.body;
    const details = await Users.findByPk(studentid, {
        attributes:["id", "username", "admNo", "phone", "company", "location", "supervisorName", "supervisorId", "fSupervisorName", "fSupervisorId", "approvalStatus"]
    });
    res.json([details])
})


module.exports = router;