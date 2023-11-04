var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require('./multer')

/* GET users listing. */

router.post('/add_new_category',upload.single('icon'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into category(companyid, category, description, icon, createdat, updateby, createdby)values(?,?,?,?,?,?,?)",[req.body.companyid,req.body.category,req.body.description,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
      if(error){
        console.log("xxxx"+error)
          res.status(500).json({status:false,message:'server error.....'})
      }
      else{
          res.status(200).json({status:true,message:'Catetgory Added Successfully'})
      }
    })
  });



module.exports = router;
