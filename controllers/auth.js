import User from "../models/user.js";
import handleAsync from "../utils/handleAsync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { config } from "../config/config.js";

const signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
}

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (config.ENV === "production") cookieOptions.secure = true;

//   res.cookie("jwt", token, cookieOptions);

//   user.password = undefined;
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// }
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    console.log(user._id);
    console.log(token);

    const cookieOptions = {
        expires: new Date(Date.now() + Number(config.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (config.ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

const signup = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = await User.create({
        email,
        password: hashedPassword,
    });
    
    createSendToken(newUser, 201, res);
    }
);

const login = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }
    
    createSendToken(user, 200, res);
});

const protect = handleAsync(async (req, res, next) => {
    let token;
    
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    
    if (!token) {
        return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }
    
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }
    
    req.user = currentUser;
    next();
});

const logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
    });
}

export default { signup, login, protect, logout };
