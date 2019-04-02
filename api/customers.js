var express = require('express');
var router = express.Router();
var dbService = require('../services/dbService');

router.get('/', function(req, res, next) {
  var callback = function(result){
    res.send(result);
  }
  dbService.getCustomers(callback);
});

router.post('/', function(req, res, next) {
  var callback = function(result){
    res.send({'result':result});
  }
  var customer = req.body;
  dbService.addCustomer(customer, callback);
});

router.delete('/:id', function(req, res, next) {
  var callback = function(result){
    res.send({'result':result});
  }
  var customerId = req.params.id;
  dbService.deleteCustomer(customerId,callback);
});

router.get('/:id', function(req, res, next) {
  var callback = function(customer){
    res.send(customer);
  }
  var customerId = req.params.id;
  var customer = dbService.getCustomerById(customerId,callback);
});

router.put('/:id', function(req, res, next) {
  var callback = function(result){
    res.send({'result':result});
  }
  var customerId = req.params.id;
  var customer = req.body;
  dbService.updateCustomer(customer,callback);
});
module.exports = router;
