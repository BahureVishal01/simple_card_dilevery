const cardModel = require("../models/card");

async function getCardDetails(req, res, next){
    try {
         let phone = req.query.userPhone
         console.log("phone", phone)
         let cardId = req.query.cardId
         if(phone || cardId){
            let cardData = await cardModel.getCardStatus(req)
            if(cardData.rowCount>0){
                return res.status(200).json({success : true, message : "Card status List", data : cardData.rows })
            }
            return res.status(404).json({success : false, message : "User contact or card id is not found"})
         }else{
            return res.status(400).json({success : false, message : "please provide user contact or card id "})
         }
    } catch (error) {
        return res.status(500).json({success:false, message : "Some internal server error", error : error.message})
    }
}

module.exports = {getCardDetails}