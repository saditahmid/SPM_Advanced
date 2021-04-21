//jshint esversion:6

const express = require("express");
const bodyParser= require("body-parser");
const app= express();

app.get("/", function (req, res){
  var today = new Date();
  var currentday=today.getDate();

  if (currentday===6|| currentday===0){
    res.send("Yay it's the weekend");
  }
  else{
    res.send("BOOO!");
  }
});
//

app.listen (3000, function (){
  console.log("server started ");
});
