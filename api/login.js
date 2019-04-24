var express = require('express');
var router = express.Router();
var dbService = require('../services/loginService');

router.post('/', function(req, res, next) {
    var callback = function(result){
      res.send({'result':result});
      console.log('result====>',result)
    }
    var email = req.body.email;
    console.log(email);
    dbService.getDetails(email, callback);
});

router.get('/:email',function(req,res){
  var callback = function(result){
    console.log('result===>',result)
    res.send(result);
  }
  var email = req.params.email;
  dbService.getCustomerByEmail(email,callback); 
})

router.put('/:id',function(req,res){
  var callback = function(result){
    res.send(result);
  }
  var id = req.params.id;
  var customer = req.body.customer;
  dbService.updatePassword(customer,id,callback)
})



module.exports = router;