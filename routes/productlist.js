var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require('./multer')

/* api to add new company */

router.post('/add_new_productlist', upload.any(), function (req, res, next) {
  console.log(req.body)
  console.log(req.files)
  var file_str=""
  req.files.map((item)=>{
    file_str+=item.filename+ ","
  })
  pool.query("insert into listproducts(companyid, categoryid, productid, weight, price, offerprice, description, images, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?)", [req.body.companyid,req.body.categoryid, req.body.productid, req.body.weight, req.body.price, req.body.offerprice, req.body.description, file_str, req.body.createdat, req.body.updateat, req.body.createdby], function (error, result) {
    if (error) {
      console.log("xxxx",error)
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, message: 'product List Added Successfully :)' })
    }
  })
});

router.post('/fetch_productname', function(req, res, next) {
  pool.query("select * from products where categoryid=?",[req.body.categoryid],function(error,result){
    if(error){
        console.log(error)
        res.status(500).json({status:false,message:'server error.....'})
    }
    else{
        res.status(200).json({status:true,data:result})
    }
  })
});
module.exports = router;
