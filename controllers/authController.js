const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashed = await hashPassword(password);
        await User.create({ email, password: hashed });

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // password is stored with select: false, so explicitly include it
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    register,
    login,
};