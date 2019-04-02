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
        console.log('Not Found');
      }else{
        callback(results[0]);
      }
    });
  });
};

service.update = function(){
  var sql = "UPDATE customer SET password ="+password+"WHERE email =" ;
}
module.exports = service;