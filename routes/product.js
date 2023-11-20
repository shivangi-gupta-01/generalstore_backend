var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require('./multer');
const { compile } = require('morgan');

/* api to add new company */
router.get('/fetch_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
      if (error) {
        res.status(200).json({ status: false, message: 'server error.....' })
      }
      else {
        res.status(200).json({ status: true, data: result })
      }
    })
  });
router.post('/fetch_all_pricetype',function(req,res,next){
  pool.query("select * from pricetype ",function(error,result){
    if (error) {
        
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }
  })
})

router.post('/add_new_product', upload.single('image'), function (req, res, next) {
  pool.query("insert into products(companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.companyid, req.body.categoryid, req.body.productname, req.body.description, req.body.status, req.body.trending, req.body.deals,req.body.pricetype, req.file.originalname, req.body.createdat, req.body.updateat, req.body.createdby], function (error, result) {
    if (error) {
      console.log("XXX",error)
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Company Registerd Successfully :)' })
    }
  })
});


router.get('/fetch_all_products', function (req, res, next) {
  pool.query("select * from products", function (error, result) {
    if (error) {
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }
  })
});

router.post('/edit_product_data', function (req, res, next) {
  pool.query("update products set companyid=?,categoryid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?, updateat=?, createdby=? where productid=?", [req.body.companyid, req.body.categoryid, req.body.productname, req.body.description, req.body.status, req.body.trending, req.body.deals, req.body.pricetype, req.body.updateat, req.body.createdby, req.body.companyid], function (error, result) {
    if (error) {
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Company Updated Successfully :)' })
    }
  })
});


router.post('/edit_product_image', upload.single('image'), function (req, res, next) {
  pool.query("update products set image=? where productid=?", [req.file.originalname, req.body.productid], function (error, result) {
    
    if (error) {
      // console.log(error)
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      console.log("ahana")
      res.status(200).json({ status: true, message: 'Image Updated:)' })
    }
  })
});


router.post('/delete_product_data', function (req, res, next) {
  pool.query("delete from products where productid=?", [req.body.productid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Company Deleted:)' })
    }
  })
});


router.get('/fetch_pricetype', function (req, res, next) {
  pool.query("select * from pricetype", function (error, result) {
    if (error) {
      res.status(200).json({ status: false, message: 'server error.....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }
  })
});


module.exports = router;
