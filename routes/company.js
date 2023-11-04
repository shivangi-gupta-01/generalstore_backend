var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require('./multer')

/* GET users listing. */

router.post('/add_new_company',upload.single('logo'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("insert into company(comapnyname, ownername, emailaddress, mobilenumber, address, state, city, logo, password, status, createdat, updateat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.file.originalname,req.body.password,req.body.status,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
      if(error){
          res.status(500).json({status:false,message:'server error.....'})
      }
      else{
          res.status(200).json({status:true,message:'Company Registerd Successfully :)'})
      }
    })
  });


  router.get('/fetch_all_company', function(req, res, next) {
    pool.query("select C.*,(select S.statename from states S where S.stateid=C.state) as statename, (select CC.cityname from cities CC where CC.cityid= C.city) as cityname  from company C",function(error,result){
      if(error){
          res.status(500).json({status:false,message:'server error.....'})
      }
      else{
          res.status(200).json({status:true,data:result})
      }
    })
  });


module.exports = router;
