var express=require('express');
var router=express.Router();



router.post('/',(req,res)=>{
    res.render('email');
});

module.exports=router;