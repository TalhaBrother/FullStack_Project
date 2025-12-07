import express from 'express';
import Joi from 'joi';
const userRoute = express.Router();
import User from '../schema/schema.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const registerSchema = Joi.object({
    username: Joi.string(),
    age: Joi.number().integer().min(0).required(),
    contact: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),

}).required()
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()

}).required()

userRoute.post('/register', async (req, res) => {
    try {
        const { username, age, contact, email, password } = req.body;
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.send({
                message: error.details[0].message,
                code: 400
            }
            )
        }
        let findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(409).send({
                message: "user with this email already exists!",
                code: 400
            })
        }
        const saltRounds = process.env.saltRounds
        let hashpassword = await bcrypt.hash(password, parseInt(saltRounds))
        let secretKey = process.env.secretKey
        let token = jwt.sign({ username, age, contact, email }, secretKey);
        const newUser = new User({ ...req.body, password: hashpassword });
        await newUser.save()
        res.send({
            message: "Successful",
            user: newUser,
            token: token,
            code: 200
        })
    } catch (error) {
        res.send({
            message: error.message,
            code: 404
        })
    }
})
userRoute.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return res.status(409).send({
                message: error.details[0].message,
                code: 400
            })
        }
        let findUser = await User.findOne({username})
        if (!findUser) {
            return res.status(409).send({
                message: "username doesn't exists!",
                code: 400
            })
        }
        let checkpassword =await bcrypt.compare(password, findUser.password)
        if (!checkpassword) {
            return res.status(409).send({
                message: "Password is incorrect!",
                code: 400
            })
        }
        let token = jwt.sign({ username}, process.env.secretKey);
        res.send({
            message:"Login successfully!",
            token:token,
            code:200
        })

    } catch (error) {
        console.error(error.message)
        res.send({
            message:"Failed to login!!!",
            code:400
        })
    }
})

export default userRoute;