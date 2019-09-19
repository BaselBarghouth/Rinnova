const express = require('express');

const db = require('../../database/services')

const router = express.Router();



const start = async ()=>{

    const controller = await db();

router.get('/',async (req,res,next)=>{
    const services = await controller.getServices()
   
    res.status(200).json({
        message:'get req is working ',
        users:services
    });
});
router.post('/',async (req,res,next)=>{
   const newService = { 
         service_name:req.body.service_name, 
         service_desc:req.body.service_desc,
         service_image:req.body.service_image
        }
   
   const service = await controller.addService(newService);
    res.status(200).json({
        message:'post req is working ',
        service:service
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
   
    const updateService = {
        service_id:req.params.id,
        service_name:req.body.service_name,
        service_desc:req.body.service_desc,
        service_image:req.body.service_image
    }
    const service = await controller.updateService(updateService)
    res.status(200).json({
        message:'patch req is working ',
        id:service
    });
});
router.delete('/:id',async (req,res,next)=>{
    const id = req.params.id
    const serviceDeleted = await controller.deleteService(id);
    res.status(200).json({
        message:'delete req is working ',
        id:serviceDeleted
    });
});
}
start();
module.exports = router;