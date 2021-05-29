const Chat = require('../models/Chat')

const chatControllers = {

    getChatOfUser: async(req, res)=>{
        try{
            const { _id } = req.user
            res.json({success:true})
        }catch(e){

            res.json({success:false})
        }
    },
    postChatOfUser: async(req, res)=>{
        try{
            const issuer = req.user
            const { _id } = req.params 
            const { message } = req.body
            const chatConstructor = {issuer:issuer._id, receiver: _id, message }
            res.json({success:true})
        }catch(e){
            res.json({success:false})

        }
    }



}

module.exports = chatControllers