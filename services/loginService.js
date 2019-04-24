var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password : '123456',
    port : 3306, //port mysql
    database:'moviedb',
    connectionLimit: 10,
    supportBigNumbers: true
});
var service={};
service.getDetails = function(email,callback) {
    var sql = "SELECT * FROM customer where email='"+email+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        var txt = 'Not Found'
        return callback(txt);
      }else{
        callback(results[0]);
      }
    });
  });
};

service.getCustomerByEmail = function(email,callback){
  var sql = "SELECT * FROM customer where email='"+email+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        var txt = 'Not Found'
        return callback(txt);
      }else{
        callback(results[0]);
      }
    });
  });
}



// service.updatePassword = function(email,callback){
//   var sql = "UPDATE customer SET password ='"+password+"'"WHERE email ="'+email+ ;
//   console.log("sql:"+sql);
//   pool.getConnection(function(err, connection) {
//     if(err) { console.log(err); callback({}); return; }
//     // make the query
//     connection.query(sql, function(err, results) {
//       connection.release();
//       if(err) { console.log(err); callback({}); return; }
//       if(results.length == 0){
//         var txt = 'Not Found'
//         return callback(txt);
//       }else{
//         callback(results[0]);
//       }
//     });
//   });
// }
service.updatePassword = function(customer,id,callback){
  pool.getConnection(function(err, connection) {
 if(err) { console.log(err); callback("fail"); return; }
 connection.query("UPDATE customer set ? WHERE id = ? ",[id,customer], function(err, results) {
   if(err){
    console.log("Error Selecting : %s ",err );
    callback("fail");
   }else{
    callback("success");
  }
});
});
};

// service.update = function(){
//   var sql = "UPDATE customer SET password ="+password+"WHERE email =" ;
// }
module.exports = service;