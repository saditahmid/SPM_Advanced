const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const app = express();
const publicDirectory = path.join(__dirname, './public');

let dashboard=require('./routes/studentDashboard')
let report=require('./routes/reports')
let courses=require('./routes/mycourses')

app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'hbs');
//let db = new sqlite3.Database('/home/tahmid/Git/SPM_Advanced/appMain/base/DataSource/database.sqlite3', (err) => {
  //if (err) {
   // return console.error(err.message);
  //}
  //console.log('Connected to the in-memory SQlite database.');
//});

app.use('/', dashboard);
app.use('/mycourses', courses);
app.use('/report', report);



app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
})


