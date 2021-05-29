const Chat = require('../models/Chat')
const User = require('../models/User')

const chatControllers = {

    getChatOfUser: async(req, res)=>{
        console.log("soy el buscador de chat")
        try{
            const user = req.user
            const {friendId} = req.params
            console.log(user)
            // const userToPopulateChat = await User.findOne({_id:user._id}).populate('')

            const query = {$and: [
                { $or: [ { issuer:user._id }, { issuer:friendId } ] },
                { $or: [ { receiver: friendId }, { receiver:user._id } ] }
            ]}

            const chat = await Chat.findOne(query)
            console.log("soyElChat",chat)
            res.json({success:true, response:chat}) 
        }catch(e){
            res.json({success:false})
        }
    },
    postMessageOfUser: async(req, res)=>{
        console.log("soy el controlador de mensaje")
    },
    deleteUserChats: async(req, res) =>{
        try{
            const {friendId} = req.params
            const userId = friendId
            const userDataDeleted = await User.findOneAndUpdate({_id:userId},{chats:[],friends:[]},{new:true})
            res.json({success:true,response:userDataDeleted})
            
        }catch(e){
            res.json({success:false})
        }
    },
    deleteChat: async(req,res)=>{
        try{
            const {friendId} = req.params
            const chatId = friendId
            const chatDeleted = await Chat.findOneAndDelete({_id:friendId})
            res.json({success:true,response:"deleted"})
        }catch(e){
            res.json({success:false,response:e})
        }
    },
    getFriendList: async(req,res)=>{
        try{
            const {userId} = req.params
            const userWithPopulatedFriends = await User.findOne({_id:userId}).populate('friends')
            const populatedFriends = userWithPopulatedFriends.friends
            const filteredFriendData = populatedFriends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })
            res.json({success:true,response:filteredFriendData})
        }catch(e){
            res.json({success:false,response:e})
        }
    }



}

module.exports = chatControllers