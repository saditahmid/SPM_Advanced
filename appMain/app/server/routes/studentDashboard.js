const express = require('express')
const Router=express.Router();
Router.get('/', function (req, res, next){
    res.render('mycourses')
})

module.exports = Router;