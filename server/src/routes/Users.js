const express =  require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const {sign} = require("jsonwebtoken");
const { validateToken } = require("../../middlewares/AuthMiddleware");

const router = express.Router();

//user registration

router.post("/register", (req, res) => {
    const {username, admNo, email, password, company, location, phone} = req.body;
    try{
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username,
            admNo,
            email,
            password: hash,
            company,
            location,
            phone
        })
        res.json("User created successfully")
    })
}catch(err){
    res.json(err)
}
})

//user login : inc password verification and token generation
router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where:{email:email}});
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
    const details = await Users.findByPk(id, {
        attributes:{exclude:["password", "createdAt", "updatedAt"]}
    });
    res.json([details])
})


//update progress, for the progress bar

router.put("/updateprogress", async (req, res) => {
    const { userId } = req.body;
  
    const user = await Users.findOne({where:{id:userId}});
    if (!user) {
      return res.status(404).json("User not found");
    }
  
    const { progress, progressNeg } = user;
    const progressIncrease = progress + 1;
    const progressDecrease = progressNeg - 1;
  
    await user.update({ progress: progressIncrease, progressNeg: progressDecrease });
    res.json("Progress updated");
  });
  
//Retrieve progress data from the database

router.post("/progressdetails", async(req,res)=>{
    const {userId} = req.body;
    const progressInfo = await Users.findOne({where:{id: userId}, attributes: ["progress", "progressNeg"]})
    res.json(progressInfo)
})



router.get("/auth", validateToken, (req, res)=>{
    res.json(req.user);
})

module.exports = router;