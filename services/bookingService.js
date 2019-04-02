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

var service = {};
service.getBookings = function(callback){
  var sql = "SELECT * FROM booking";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback([{}]); return; }
    // make the query
    connection.query(
      sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback([{}]); return; }
      callback({'results':results});
    });
  });
  //return result; //line 24 execute before db reply
};

service.addBooking = function(booking,callback) {
    pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback("fail"); return; }
    connection.query("INSERT INTO booking set ? ",booking, function(err, results) {
      if(err){
       console.log("Error Selecting : %s ",err );
       callback("fail");
      }else{
       callback("success");
     }
  });
});
};

service.deleteBooking = function(id,callback){
var sql = "delete FROM booking where id='"+id+"'";
pool.getConnection(function(err, connection) {
if(err) { console.log(err); callback("fail"); return; }
// make the query
connection.query(sql, function(err, results) {
  connection.release();
  if(err) { console.log(err); callback("fail"); return; }
  callback("success");
});
});
}

// service.getMovieById = function(id,callback){
// var record = {};
// var sql = "SELECT * FROM booking where id='"+id+"'";
// console.log("sql:"+sql);
// pool.getConnection(function(err, connection) {
// if(err) { console.log(err); callback({}); return; }
// // make the query
// connection.query(sql, function(err, results) {
//   connection.release();
//   if(err) { console.log(err); callback({}); return; }
//   if(results.length == 0){
//     callback(record);
//   }else{
//     callback(results[0]);
//   }
// });
// });

// };
service.updateBooking= function(movie,callback){
     pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback("fail"); return; }
    connection.query("UPDATE booking set ? WHERE id = ? ",[booking,booking.id], function(err, results) {
      if(err){
       console.log("Error Selecting : %s ",err );
       callback("fail");
      }else{
       callback("success");
     }
  });
});
};

service.deleteBooking = function(id,callback){
var sql = "delete FROM booking where id='"+id+"'";
pool.getConnection(function(err, connection) {
if(err) { console.log(err); callback("fail"); return; }
// make the query
connection.query(sql, function(err, results) {
connection.release();
if(err) { console.log(err); callback("fail"); return; }
callback("success");
});
});
}

module.exports = service;