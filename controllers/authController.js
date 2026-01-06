const User = require("../models/User");
const {hashPassword, comparePassword} = require("../utils/hash");
const {generateAccessToken, generateRefreshToken} = require("../utils/jwt");

const register = async (req, res) => {
    const {email, password} = req.body;

    const exist = await user.findOne({email});
    if(exist){
        return res.status(409).json({message : "User already exists"});
    }

    const hashed = await hashPassword(password);
    await User.create({email, password: hashed});

    res.status(201).json({message: "User registered"});
};

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message : "User not found"});
    }

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch){
        return res.status(401).json({message : "Invalid credentials"});
    }

    const accessToken = generateAccessToken({id: user._id});
    const refreshToken = generateRefreshToken({id: user._id});

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({accessToken, refreshToken});
};

module.exports = {
    register,
    login
};