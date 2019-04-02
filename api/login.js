var express = require('express');
var router = express.Router();
var dbService = require('../services/loginService');

router.post('/', function(req, res, next) {
    var callback = function(result){
      res.send({'result':result});
    }
    var email = req.body.email;
    console.log(email);
    dbService.getDetails(email, callback);
});



module.exports = router;