const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) res.json({error:"User not Logged in"});

    try{
        const validToken = verify(accessToken, "mysecret");
        req.user = validToken;
        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({error: err})
    }
};

module.exports = { validateToken }