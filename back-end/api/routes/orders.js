const express = require('express');

const router = express.Router();

const db = require("../../database/orders");

const auth = require('../../Auth/auth')

const start = async () => {
    const controller = await db();
router.get('/',auth,async(req,res,next)=>{
const orders = await controller.getOrders();
    res.status(200).json({
        message:'success',
        orders:orders
    });
});
router.post('/',auth,async (req,res,next)=>{
    const order = {
     user_id:req.body.user_id,
    status:req.body.status
    }
    const newOrder = await controller.addOrder(order)
    res.status(200).json({
        message:'success',
        newOrder:newOrder
    })
})
router.get('/:id',auth,async(req,res,next)=>{
    const id = req.params.id
    res.status(200).json({
        message:'success ',
        id:id
    });
});
router.patch('/:id',auth,async(req,res,next)=>{
    const updated ={
        order_id:req.params.id,
        user_id:req.body.order_id,
        status:req.body.status
    }
const orderUpdated = await controller.updateOrder(updated)
    
    res.status(200).json({
        message:'success',
        orderUpdated:orderUpdated
    });
});
router.delete('/:id',auth,async(req,res,next)=>{
    const id = req.params.id
    const orderDeleted = await controller.deleteOrder(id)
    res.status(200).json({
        message:'success',
        order:orderDeleted
    });
});
}
start();
module.exports = router;