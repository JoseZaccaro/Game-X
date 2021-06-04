const Buy = require('../models/Buys')

const buyController = {
    //obtener una compra por id
    getBuyByID: async(req , res)=>{
        try {
            const userBuys = await Buy.find({userId: req.params.id})
            if (userBuys.length != 0) {
                res.json({success: true, respuesta: userBuys})
            } else{
            res.json({success: false, respuesta: []})
        }
        } catch(error) {
            console.log(error)
            res.json({success: false, respuesta: 'Oops! an error has ocurred with the server. Verify the endpoint or the ID and if it still not working, please try again later...'})
        }  
    },
    addBuy: async(req , res) =>{
        let {firstName, lastName, city, cellphone, direction, total, products, userId} = req.body
        let personalInfo = {firstName, lastName, city, cellphone, direction}
        try{
            const new_buy = new Buy({products, userId, deliverInformation: personalInfo, totalPrice:total })
            await new_buy.save()
            res.json({success: true , response: new_buy})
        }catch(error){
            console.log("error en addBuy" , error)
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