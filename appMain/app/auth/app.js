const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const app = express();
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'hbs');
let db = new sqlite3.Database('E:/Spring 2021 course work/SPM_Advanced/appMain/base/DataSource/database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(3000, () => {
  console.log("Server started on Port 3000");

})


