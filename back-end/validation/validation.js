const joi =require('@hapi/joi');

const userValidation = user=>{
    const schema = joi.object({
        user_name:joi.string().min(6).required(),
        user_lastname:joi.string().min(6).required(),
        user_email:joi.string().min(6).email().required(),
        user_password:joi.string().min(6).required(),
        user_role: joi.string().required()
    });
    return schema.validate(user);
};
const itemValidation = (item)=>{
    const schema = {
       


    };
    return joi.validate(item,schema);
};
const productValidation = (product)=>{
    const schema = {
      


    };
    return joi.validate(product,schema);
};
const serviceValidation = (service)=>{
    const schema = {
       
    };
    return joi.validate(service,schema);
};

module.exports = userValidation;


