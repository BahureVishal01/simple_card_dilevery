const {pool} = require("../db/db")

async function storeCardDetails(row, status){
   let mobile_no;
   if(!row.hasOwnProperty('User contact')){
      mobile_no = row['User Mobile']
   }else{
      mobile_no = row['User contact']
   }
   console.log("Hello>>>>>>>>", mobile_no)
   
   let insertQuery = `INSERT INTO public.card_status(
	 card_id, user_phone, status, comment, "timestamp")
	VALUES ($1, $2, $3, $4, $5)`;
    let values = [row['Card ID'], String(parseInt(mobile_no.replace(/"/g, ''), 10)), row.status, row.Comment, row.Timestamp]
   let result = await pool.query(insertQuery, values);
   return result;
}

async function getCardStatus(req){
    let phone = req.query.userPhone? req.query.userPhone:''
    let cardId = req.query.cardId?req.query.cardId:''
   let getQuery = 'select * from public.card_status where user_phone=$1 OR card_id =$2';
   let values = [phone, cardId];
   let result = await pool.query(getQuery, values);
   return result
}
module.exports = {storeCardDetails, getCardStatus}