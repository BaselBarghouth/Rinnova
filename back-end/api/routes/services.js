const express = require('express');

const db = require('../../database/services')

const router = express.Router();



const start = async ()=>{

    const controller = await db();

router.get('/',async (req,res,next)=>{
    const services = await controller.getServices()
   
    res.status(200).json({
        message:true,
        services:services
    });
});
router.post('/',async (req,res,next)=>{
   const newService = { 
         "service_name":req.body.service_name, 
         "service_desc":req.body.service_desc,
         "service_image":req.body.service_image
        }
   
   const service = await controller.addService(newService);
    res.status(200).json({
        message:true,
        service:service
    })
})
router.get('/:id',async (req,res,next)=>{
    const id = req.params.id
   
    res.status(200).json({
        message:true,
        id:id
    });
});
router.patch('/',async (req,res,next)=>{
   
    const updateService = {
        service_id:req.body.service_id,
        service_name:req.body.service_name,
        service_desc:req.body.service_desc,
        service_image:req.body.service_image
    }
    const service = await controller.updateService(updateService)
    res.status(200).json({
        message: true,
        id:service
    });
});
router.delete('/',async (req,res,next)=>{
    const id = req.body.service_id
    const serviceDeleted = await controller.deleteService(id);
    res.status(200).json({
        message:true,
        id:serviceDeleted
    });
});
}
start();
module.exports = router;