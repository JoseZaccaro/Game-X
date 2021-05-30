const User = require('../models/User')
const Chat = require('../models/Chat')
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
                createdUser = new User({userName, email, password, avatar: avatarURL ? avatarURL : '', country, imageUrl: imageUrl ? imageUrl: null, loggedWithGoogle: country === "null", friends:[] })
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
           respuesta: !error ? {token: respuesta, avatar: createdUser.avatar , imageUrl: createdUser.imageUrl , userName: createdUser.userName, id:createdUser._id, rol:createdUser.rol, friends:createdUser.friends,}: null,
           error: error
       })  
    },
    logIn: async (req, res) => {
        const {userName, password, country} = req.body
        var respuesta;
        var error;
        let filteredFriendData
        const userExist = await User.findOne({userName: userName}).populate('friends')
        if (userExist) {
            if (!userExist.loggedWithGoogle && !country || userExist.loggedWithGoogle && country === "null") {
                const passwordMatch = bcryptjs.compareSync(password, userExist.password)
                if (passwordMatch) {
                    const token = jwt.sign({...userExist}, process.env.SECRET_OR_KEY)
                    respuesta = token
                    const populatedFriends = userExist.friends
                    filteredFriendData = populatedFriends.map(friend =>{
                        return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
                    })
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
            respuesta:!error ? {token: respuesta, avatar: userExist.avatar, imageUrl:userExist.imageUrl, userName: userExist.userName, id:userExist._id, rol:userExist.rol, friends:filteredFriendData,} : null,
            error: error
        })
    },
    forcedLogin: async(req, res) => {
        const {_id} = req.user
        const user = await User.findOne({_id}).populate('friends')
        const populatedFriends = user.friends
        const filteredFriendData = populatedFriends.map(friend =>{
            return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
        })
        res.json({success: true, respuesta: {avatar: user.avatar, imageUrl:user.imageUrl, userName: user.userName , id:user._id, rol:user.rol, friends:filteredFriendData}})
    },
    getUsers: async(req, res)=>{
        try{
            let users
            const {userName} = req.body
            userName.trim().length > 0 ?
            users = await User.find({userName:{$regex: userName.trim(), $options:'i'}})
            : users = ["There are no results for this search"]
            res.json({success:true, response:users})
        }catch(e){
            res.json({success:false})
        }
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
    addFriend: async(req,res)=>{
        try{
            const {friendId} = req.params
            const user = req.user
            const newChat = new Chat({issuer:user._id,receiver:friendId,messages:[]})
            const options = {new:true}
            const queryChatIssuer = {$push:{friends:friendId,chats:newChat._id}}
            const queryChatReceiver = {$push:{friends:user._id, chats:newChat._id}}
            const issuer = await User.findOneAndUpdate({_id:user._id},queryChatIssuer,options).populate('friends')
            const receiver = await User.findOneAndUpdate({_id:friendId},queryChatReceiver, options)
            newChat.save()
            const populatedFriends = issuer.friends
            const filteredFriendData = populatedFriends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })
            res.json({success:true,response:filteredFriendData})
            // res.json({success:true, response:newChat})

        }catch(e){
            res.json({success:false, response:e})
        }
    },
    deleteFriend: async(req,res)=>{
        try{
            const friendId = req.params.userId
            const user = req.user
            const query = {$and: [
                { $or: [ { issuer:user._id }, { issuer:friendId } ] },
                { $or: [ { receiver: friendId }, { receiver:user._id } ] }
            ]}
            await Chat.findOneAndDelete(query)
            const options = {new:true}
            const queryChatIssuer = {$pull:{friends:friendId}}
            const queryChatReceiver = {$pull:{friends:user._id}}
            const issuer = await User.findOneAndUpdate({_id:user._id},queryChatIssuer,options)
            const receiver = await User.findOneAndUpdate({_id:friendId},queryChatReceiver, options)
            const userFriends = await User.findOne({_id:user._id}).populate('friends')
            const filteredFriendData = userFriends.friends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })

            res.json({success:true, response:filteredFriendData})

        }catch(e){
            console.log(e)
            res.json({success:false, response:e})
        }
    }
}

module.exports = userController