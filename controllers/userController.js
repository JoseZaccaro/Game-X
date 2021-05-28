const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    newUser: async (req, res) => {
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
    getUser: async(req, res)=>{
        try{
            let users
            const {userName} = req.body
            userName.trim().length > 0 ?
            users = await User.find({userName:{$regex: userName.trim(), $options:'i'}})
            : users = ["There are no results for this search"]
            res.json({success:true, response:users})
        }catch(e){
            console.log(e)
            res.json({success:false})
        }
    }
}

module.exports = userController