const express = require('express');

const db = require('../../database/users')

const router = express.Router();

const userValidation= require('../../validation/validation')

const start = async ()=>{

    const controller = await db();

router.get('/',async (req,res,next)=>{
    const users = await controller.getUsers();
    console.log(users)
    res.status(200).json({
        message:'get req is working ',
        users:users
    });
});
router.post('/',async (req,res,next)=>{
   const newUser = {
       user_name:req.body.user_name,
       user_lastname:req.body.user_lastname,
       user_email:req.body.user_email,
       user_password:req.body.user_password,
       user_role:req.body.user_role
   }
    const {error}  =  userValidation(newUser)
    if(error) return res.status(400).json({message:error.details[0].message})
   const user = await controller.addUser(newUser);
    res.status(200).json({
        message:true,
        user:user
    })
})
router.get('/:id',async (req,res,next)=>{
    const id = req.params.id
   
    res.status(200).json({
        message:'get req is working ',
        id:id
    });
});
router.patch('/:id',async (req,res,next)=>{
    
    const updatedUser = {
        user_id:req.params.id,
        user_name:req.body.user_name,
        user_lastname:req.body.user_lastname,
        user_email:req.body.user_email,
        user_password:req.body.user_password,
        user_role:req.body.user_role
    }
    const user = await controller.updateUser(updatedUser)
    res.status(200).json({
        message:'get req is working ',
        id:user
    });
});
router.delete('/:id',async (req,res,next)=>{
    const id = req.params.id
    const userDeleted = await controller.deleteUser(id);
    res.status(200).json({
        message:'get req is working ',
        id:userDeleted
    });
});
}
start();
module.exports = router;