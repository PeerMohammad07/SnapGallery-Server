"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../model/userSchema"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const JwtService = new jwtService_1.default();
const userAuth = async (req, res, next) => {
    const refreshToken = req.cookies.userRefreshToken;
    let userToken = req.cookies.userToken;
    if (!refreshToken) {
        return res.status(401).json({ status: false, message: "Not authorized" });
    }
    if (!userToken || userToken === '' || Object.keys(userToken).length === 0) {
        try {
            const newUserToken = await refreshAccessToken(refreshToken);
            res.cookie("userToken", newUserToken, {
                httpOnly: true,
                maxAge: 3600000,
                secure: process.env.NODE_ENV != "production"
            });
            userToken = newUserToken;
        }
        catch (error) {
            return res.status(401).json({ message: "Failed to refresh access token" });
        }
    }
    try {
        const decoded = await JwtService.verifyToken(userToken);
        let user;
        if (decoded) {
            user = await userSchema_1.default.find({ _id: decoded.id });
        }
        if (!user) {
            return res.status(401).json({ status: false, message: "Not Authorized, User not found" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ status: false, message: "Not authorized, invalid token" });
    }
};
async function refreshAccessToken(refreshToken) {
    try {
        const decoded = await JwtService.verifyRefreshToken(refreshToken);
        if (decoded && decoded.name) {
            const newToken = await JwtService.generateToken({ id: decoded.userId, name: decoded.name });
            return newToken;
        }
    }
    catch (error) {
        throw new Error("Invalid refresh token");
    }
}
exports.default = userAuth;
