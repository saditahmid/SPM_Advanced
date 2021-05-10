const express = require("express");
const Router = express.Router();

Router.get("/", (req,res) => {

    res.render(`index`)
});
Router.get("/register", (req,res) => {

    res.render(`register`)
});
Router.get("/login", (req,res) => {

    res.render(`login`)
});
Router.get("/users", (req,res) => {

    res.render(`users`)
});
Router.get("/student", (req,res) => {

    res.render(`student`)
});

Router.get("/Faculty", (req,res) => {

    res.render(`Faculty`)
});
Router.get("/Admin", (req,res) => {

    res.render(`Admin`)
});
Router.get("/Dean", (req,res) => {

    res.render(`Dean`)
});
Router.get("/Head", (req,res) => {

    res.render(`Head`)
});
Router.get("/VC", (req,res) => {

    res.render(`VC`)
});
Router.get("/index", (req,res) => {

    res.render(`index`)
});
Router.get("/StudentCourses", (req,res) => {

    res.render(`StudentCourses`)
});
Router.get("/studentReports", (req,res) => {

    res.render(`studentReports`)
});
Router.get("/studentDownloads", (req,res) => {

    res.render(`studentDownloads`)
});
Router.get("/studentMyAccounts", (req,res) => {

    res.render(`studentMyAccounts`)
});
Router.get("/contactUs", (req,res) => {

    res.render(`contactUs`)
});



Router.get("/facultyCourses", (req,res) => {

    res.render(`facultyCourses`)
});
Router.get("/facultyDataEntry", (req,res) => {

    res.render(`facultyDataEntry`)
});
Router.get("/seeAllStudents", (req,res) => {

    res.render(`seeAllStudents`)
});
Router.get("/facultyStudentReport", (req,res) => {

    res.render(`facultyStudentReport`)
});
Router.get("/facultyDownloads", (req,res) => {

    res.render(`facultyDownloads`)
});
Router.get("/facultyMyAccount", (req,res) => {

    res.render(`facultyMyAccount`)
});



Router.get("/headCourseReport", (req,res) => {

    res.render(`headCourseReport`)
});
Router.get("/headDataEntry", (req,res) => {

    res.render(`headDataEntry`)
});
Router.get("/headDownloads", (req,res) => {

    res.render(`headDownloads`)
});
Router.get("/headInstructorReport", (req,res) => {

    res.render(`headInstructorReport`)
});
Router.get("/headMyCourse", (req,res) => {

    res.render(`headMyCourse`)
});
Router.get("/headSeeAllStudents", (req,res) => {

    res.render(`headSeeAllStudents`)
});
Router.get("/headMyAccount", (req,res) => {

    res.render(`headMyAccount`)
});
Router.get("/headStudentReport", (req,res) => {

    res.render(`headStudentReport`)
});
Router.get("/headDownloads", (req,res) => {

    res.render(`headDownloads`)
});
Router.get("/adminRegister", (req,res) => {

    res.render(`adminRegister`)
});
Router.get("/adminDepartmentWise", (req,res) => {

    res.render(`adminDepartmentWise`)
});
Router.get("/adminSchoolWise", (req,res) => {

    res.render(`adminSchoolWise`)
});
Router.get("/adminProgramWise", (req,res) => {

    res.render(`adminProgramWise`)
});
Router.get("/adminMyAccount", (req,res) => {

    res.render(`adminMyAccount`)
});
Router.get("/adminStudentEnrolled", (req,res) => {

    res.render(`adminStudentEnrolled`)
});

module.exports = Router;