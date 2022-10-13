'use strict';

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

module.exports.hello = async (event) => {
  let request = JSON.parse(event.body)
  let username = request.email
  let password = request.password
  let sql = "SELECT id, txtFirstName, txtPhonenumber FROM crm.tblusers where txtEmail='"+username+"' and txtPassword='"+password+"';";
  let prom = await new Promise((resolve, reject)=>{
    con.query(sql, function(err, result){
      if(err) throw err;
      console.log(JSON.stringify(result))
      if(result != ""){
      resolve({body: "SUCCESS!!!"+JSON.stringify(result)});
      }
      else{
        reject("incorrect email or password")
      }
    })
  })
  
  return prom

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};




