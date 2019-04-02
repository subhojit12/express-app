var express = require('express');
var router = express.Router();
var dbService = require('../services/bookingService');

router.get('/', function(req, res, next) {
  
    var callback = function(result){
      res.send(result);
    }
    dbService.getBookings(callback);
   
});



router.post('/', function(req, res, next) {
    var callback = function(result){
      res.send({'result':result});
    }
    var booking = req.body;
    dbService.addBooking(booking, callback);
  });
  
  router.put('/:id', function(req, res, next) {
    var callback = function(result){
      res.send({'result':result});
    }
    var bookingId = req.params.id;
    var booking = req.body;
    dbService.updateBooking(booking,callback);
  });
  
  router.delete('/:id', function(req, res, next) {
    var callback = function(result){
      res.send({'result':result});
    }
    var bookingId = req.params.id;
    dbService.deleteBooking(bookingId,callback);
  });

module.exports = router;

