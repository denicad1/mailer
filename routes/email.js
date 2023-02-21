var express=require('express');
var router=express.Router();



router.get('/',(req,res)=>{
    res.render('email');
});

module.exports=router;