const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs');
const directoryPath = 'public/'
module.exports = {
    userSignUp: async (req, res) => {

        try {
            if(req.body.password && req.body.username && req.body.email){
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create(req.body)
            res.json({ status: 'ok' })
        }else{
            res.json({ status: 'error', error: "All fields are required" })
        }
        } catch (error) {
            res.json({ status: 'error', error: "Email already exists" })
        }
    },
    userLogin: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })

            if (user) {
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
                if (isPasswordValid) {

                    const token = jwt.sign({ username: user.username, email: user.email, id: user._id }, 'myWebAppSecretKey123')
                    // return res.json({ status: 'ok', user: true })
                    return res.status(200).json({ message: "Login Sucess", token, user: user.username });
                } else {
                    return res.status(403).json({ message: "Password Does not Match" });
                }
            } else {
                return res.status(500).json({ message: "No User Found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }
    },
    verifyToken: async (req, res) => {

        try {
            const Token = req.body.Token
            const decoded = jwt.verify(Token, 'myWebAppSecretKey123')
            const email = decoded.email
            const user = await User.findOne({ email: email })
            if (user.image) user.image = `http://localhost:9000/${user.image}`
            else user.image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`


            return res.status(200).json({ message: "token valid", user });

        } catch (error) {
            console.log(error);
            res.json({ status: 'error', error: "invalid token" })
        }


    },

    imageupload: async (req, res) => {
        try {
            const { Token } = JSON.parse(req.params.Stoken);
            const decoded = jwt.verify(Token, 'myWebAppSecretKey123')

            const user = await User.findOne({ _id: decoded.id }).select("-password")
            const oldImage = user.image
            if(oldImage){    
                fs.unlink(directoryPath + oldImage, async (err) => {
                    if (err) {
                        throw err;
                    }
                });
                const remove = await User.updateOne({ _id: decoded.id }, {
                    $unset: { image: "" }
                })

            }
            const update = await User.updateOne({ _id: decoded.id }, {
                $set: {
                    image: req.files.image[0].filename
                }
            })
            const image = `http://localhost:9000/${req.files.image[0].filename}`
            console.log(image);
            return res.status(200).json({ message: "user found", image });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }


    },
    removeimage: async (req, res) => {
        try {
            const { Token } = JSON.parse(req.params.Stoken);
            const decoded = jwt.verify(Token, 'myWebAppSecretKey123')
            const user = await User.findOne({ _id: decoded.id }).select("-password")
            const oldImage = user.image

            if(oldImage){
                fs.unlink(directoryPath + oldImage, async (err) => {
                    if (err) {
                        throw err;
                    }
                });
                const update = await User.updateOne({ _id: decoded.id }, {
                    $unset: { image: "" }
                })

            }
            const image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            return res.status(200).json({ message: "user found", image });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "something went wrong" });
        }
    },
    getuser: async (req, res) => {
        try {
            const Token = req.body.Token
            const decoded = jwt.verify(Token, 'myWebAppSecretKey123')
            const email = decoded.email
            const user = await User.findOne({ email: email })
            console.log(user);
            return res.status(200).json({ message: "user found", user });
        } catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    },

    userDash: async (req, res) => {
        const token = req.headers['x-access-token']
        try {
            const decoded = jwt.verify(token, 'myWebAppSecretKey123')
            const email = decoded.email
            const user = await User.findOne({ email: email })
            res.json({ status: 'ok', user: user.name })
        } catch (error) {
            console.log(error);
            res.json({ status: 'error', error: "invalid token" })


        }
    }
}