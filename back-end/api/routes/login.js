const express = require('express');

const jwt = require('jsonwebtoken')

const db = require('../../database/users')

const router = express.Router();


const start = async ()=>{
const controller = await db();

router.post('/',async (req,res,next)=>{

    const user = {
    
        user_email:req.body.user_email,
        user_password:req.body.user_password,
    }
 try{
  const resualt= await controller.findUser(user);
const token = jwt.sign({user:resualt},'basel')
res.header('auth-token',token)
    .json({
        message:'you are loged in',
        user:resualt,
        token:token
    })}catch(err){
        console.log(err)
        res.json({
            error:err
        })
    }
    

   
 })



}

start();





module.exports = router;