const Buy = require('../models/Buys')

const buyController = {
    //obtener una compra por id
    getBuyByID: async(req , res)=>{
        try{
            const buy = await Buy.findOne({_id: req.params.id})
            res.json({success: true , response: buy})
        }catch(error){
            console.log("error en getBuy" , error)
            res.json({success: false , response: error})
        }
    },
    getAllbuys: async(req , res)=>{
        try{
            const allBuys = await Buy.find()
            res.json({success: true , response: allBuys})
        }catch(error){
            console.log("error en getAllBuys" , error)
            res.json({success: false , response: error})
        }
    },
    modifyBuyByID: async(req , res)=>{
        try{
            const buy = await Buy.findOneAndUpdate({_id: req.params.id} , {...req.body} , {new:true})
            res.json({success: true , response: buy})
        }catch(error){
            console.log("error en modifyBuy" , error)
            res.json({success: false , response: error})
        }
    },
    deleteBuyByID: async(req , res)=>{
        try{
            const buy = await Buy.findOneAndRemove({_id: req.params.id})
            res.json({success: true})
        }catch(error){
            console.log("error en deleteBuyByID" , error)
            res.json({success: false , response: error})
        }
    }
}

module.exports = buyController