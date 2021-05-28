const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')


let transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: "gamex.arg@gmail.com",
        pass: "matias388"
    },
    tls: {
        rejectUnauthorized: false
    }
})

const userController = {
    newUser: async (req, res) => {
        console.log(transport)
        var {userName, email, password, avatarURL, country, imageUrl} = req.body
        const {avatar} = req.files ? req.files : req.body
        const existentMail = await User.findOne({email})
        const existentUserName = await User.findOne({userName})
        var respuesta;
        var error;    
        var createdUser;
        password = bcryptjs.hashSync(password, 10)
        if (!existentMail && !existentUserName) {
            try {
                createdUser = new User({userName, email, password, avatar: avatarURL ? avatarURL : '', country, imageUrl: imageUrl ? imageUrl: null, loggedWithGoogle: country === "null" })
                const {_id} = createdUser
                const fileName = _id + ".jpg"
                const path = `${__dirname, './'}/client/build/assets/${fileName}`
                createdUser.avatar = '/assets/' + fileName 
                await createdUser.save()
                avatar.name && avatar.mv(path, error =>{                
                    if (error) {
                        return res.json({success: false, respuesta: "failed trying to save avatar"})
                    }
                })
                let mailOptions = {
                    from: 'Account Created! <nocontestar@donotreply.com>',
                    to: email,
                    subject: 'Thanks for your Registration!',
                    html: `<div style="
                    background-image: url('https://i.imgur.com/blau73C.jpg');                     
                    height:100vh; 
                    width:100%; 
                    background-position: top;
                    background-size: cover;
                    margin:0 ;
                    padding: 0;
                    ">
                        <div style="padding-top: 40%;">
                            <h1 style="
                            background-color: #A3EEE9;
                            width: 25vw;
                            height: 40px;
                            color: #A3EEE9;
                            text-align: center;
                            border-radius: 30px;
                            ">Welcome to Game-X !</h1>
                        </div>
                        <div>
                            <h1 style="
                            background-color: #A3EEE9;
                            width: 25vw;
                            height: 40px;
                            color: #A3EEE9;
                            text-align: center;
                            border-radius: 30px;
                            ">Thanks for your register!</h1>
                        </div>`
                    }
                    transport.sendMail(mailOptions, (err) => {
                        if (err) console.log(err)
                        res.json({success: true})
                    })           
                const token = jwt.sign({...createdUser}, process.env.SECRET_OR_KEY)
                respuesta = token   
            } catch (error) {
                console.log(error)
                error = "There was an error in the register."
            }                  
       } else if (existentMail){
           error = "The E-mail is already in use"
       } else {
           error = "The Username is already in use"
       }
       res.json({
           success: !error ? true : false,
           respuesta: !error ? {token: respuesta, avatar: createdUser.avatar , imageUrl: createdUser.imageUrl , userName: createdUser.userName, id:createdUser._id}: null,
           error: error
       })  
    },
    logIn: async (req, res) => {
        const {userName, password, country} = req.body
        var respuesta;
        var error;
        const userExist = await User.findOne({userName: userName})
        if (userExist) {
            if (!userExist.loggedWithGoogle && !country || userExist.loggedWithGoogle && country === "null") {
                const passwordMatch = bcryptjs.compareSync(password, userExist.password)
                if (passwordMatch) {
                    const token = jwt.sign({...userExist}, process.env.SECRET_OR_KEY)
                    respuesta = token
                } else {
                    error = "Invalid User or Password"
                } 
            } else if (!userExist.loggedWithGoogle && country === "null"){
                error = "Users Registered without Google cannot log in with Google. Complete the fields to log in."            
            }else {
                error = "Users Registered with Google can only log in with Google button"
            }                       
        } else {
            error = "Invalid Username or Password"
        }
        res.json({
            success: !error ? true : false,
            respuesta:!error ? {token: respuesta, avatar: userExist.avatar, imageUrl:userExist.imageUrl, userName: userExist.userName, id:userExist._id} : null,
            error: error
        })
    },
    forcedLogin: (req, res) => {
        res.json({success: true, respuesta: {avatar: req.user.avatar, imageUrl:req.user.imageUrl, userName: req.user.userName , id:req.user._id}})
    },
    changeRol: async (req, res) => {
        const {userName, newRol} = req.body  
        if (req.user.rol === 'admin') {
            const userToModify = await User.findOneAndUpdate({userName: userName}, {rol:newRol}, {new:true}) 
            if (userToModify) {
                res.json({success:true, respuesta: userToModify})              
            } else{
                res.json({success:false, error: 'User not founded'}) 
            }
        } else {
            res.json({success:false, error: "You must be authorized Administrator to modify this property"}) 
        }
    },
}

module.exports = userController