const express = require('express');

const router = express.Router();

const db = require("../../database/order_items");

const auth = require('../../Auth/auth')

const start = async () => {
    const controller = await db();
router.get('/',auth,async(req,res,next)=>{
const orders = await controller.getOrderItems();
    res.status(200).json({
        message:'success',
        orders:orders
    });
});
router.post('/',auth,async (req,res,next)=>{
    const orderItem = {
     order_id:req.body.order_id,
     item_id:req.body.item_id,
    order_item_qty:req.body.order_item_qty
    }
    const newOrderItems = await controller.addOrderItems(orderItem)
    res.status(200).json({
        message:'success',
        orderItem:orderItem
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
        order_item_id:req.params.order_item_id,
        order_id:req.body.order_id,
     item_id:req.body.item_id,
    order_item_qty:req.body.order_item_qty
    }
const orderItemsUpdated = await controller.updateOrderItem(updated)
    
    res.status(200).json({
        message:'success',
        orderItemsUpdated:orderItemsUpdated
    });
});
router.delete('/:id',auth,async(req,res,next)=>{
    const id = req.params.id
    const orderDeleted = await controller.deleteOrderItem(id)
    res.status(200).json({
        message:'success',
        order:orderDeleted
    });
});
}
start();
module.exports = router;