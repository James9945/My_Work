const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");



//Registration Control

const register = async (req, res) => {
    try{
    const {username,password,role} = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({username, password: hashpassword, role});
    await newUser.save();
    res.status(201).json({message:`User registered with username ${username}`});
} catch (err) {
    res.status(500).json({message:err.message});
}
};

//login Control
const login = async (req, res) => {
    try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({message:"User not found"})
    };
    
    const ismatch = await bcrypt.compare(password, user.password);
    if(!ismatch){
        return res.status(400).json({message: "Invalid Credentials"});
    };

    const token = jwt.sign({id: user._id, role:user.role},
     process.env.JWT_SECRET, {expiresIn: "1h"} 
     );
} catch(err){
    res.status(500).json({message:err.message});
}

};

module.exports = {
    register,
    login,
};