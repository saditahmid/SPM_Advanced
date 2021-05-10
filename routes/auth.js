const express = require("express");
const authController = require('../controllers/auth');
const Router = express.Router();
Router.post("/register", authController.register)
Router.post("/login", authController.login)
Router.post("/login", authController.student)
Router.post("/student", authController.login)
Router.post("/student", authController.student)
Router.post("/StudentCourses", authController.student)
Router.post("/StudentCourses", authController.StudentCourses)
Router.post("/studentReports", authController.student)
Router.post("/studentReports", authController.studentReports)
Router.post("/Faculty", authController.login)
Router.post("/facultyCourses", authController.Faculty)
Router.post("/facultyCourses", authController.facultyCourses)
Router.post("/facultyDataEntry", authController.Faculty)
Router.post("/facultyDataEntry", authController.facultyCourses)
Router.post("/facultyDataEntry", authController.facultyDataEntry)
Router.post("/seeAllCourses", authController.Faculty)
Router.post("/seeAllCourses", authController.facultyCourses)
Router.post("/seeAllCourses", authController.seeAllCourses)

Router.post("/facultyStudentReport", authController.Faculty)
Router.post("/facultyStudentReport", authController.facultyCourses)
Router.post("/facultyStudentReport", authController.facultyStudentReport)

Router.post("/facultyDownloads", authController.Faculty)
Router.post("/facultyDownloads", authController.facultyCourses)
Router.post("facultyDownloads", authController.facultyStudentReport)
Router.post("facultyDownloads", authController.facultyDownloads)

Router.post("/facultyMyAccount", authController.Faculty)
Router.post("/facultyMyAccount", authController.facultyCourses)
Router.post("/facultyMyAccount", authController.facultyStudentReport)
Router.post("/facultyMyAccount", authController.facultyDownloads)
Router.post("/facultyMyAccount", authController.facultyMyAccount)


Router.post("/headCourseReport", authController.head)
Router.post("/headCourseReport", authController.headCourseReport)
Router.post("/headCourseReport", authController.headStudentReport)
Router.post("/headCourseReport", authController.headDataEntry)
Router.post("/headCourseReport", authController.headMyAccount)
Router.post("/headCourseReport", authController.headDownloads)
Router.post("/headCourseReport", authController.headInstructorReport)
Router.post("/headCourseReport", authController.headMyCourse)

Router.post("/headStudentReport", authController.head)
Router.post("/headStudentReport", authController.headCourseReport)
Router.post("/headStudentReport", authController.headStudentReport)
Router.post("/headStudentReport", authController.headDataEntry)
Router.post("/headStudentReport", authController.headMyAccount)
Router.post("/headStudentReport", authController.headDownloads)
Router.post("/headStudentReport", authController.headInstructorReport)
Router.post("/headStudentReport", authController.headMyCourse)

Router.post("/headDataEntry", authController.head)
Router.post("/headDataEntry", authController.headCourseReport)
Router.post("/headDataEntry", authController.headStudentReport)
Router.post("/headDataEntry", authController.headDataEntry)
Router.post("/headDataEntry", authController.headMyAccount)
Router.post("/headDataEntry", authController.headDownloads)
Router.post("/headDataEntry", authController.headInstructorReport)
Router.post("/headDataEntry", authController.headMyCourse)



Router.post("/headDownloads", authController.head)
Router.post("/headDownloads", authController.headCourseReport)
Router.post("/headDownloads", authController.headStudentReport)
Router.post("/headDownloads", authController.headDataEntry)
Router.post("/headDownloads", authController.headMyAccount)
Router.post("/headDownloads", authController.headDownloads)
Router.post("/headDownloads", authController.headInstructorReport)
Router.post("/headDownloads", authController.headMyCourse)



Router.post("/headInstructorReport", authController.head)
Router.post("/headInstructorReport", authController.headCourseReport)
Router.post("/headInstructorReport", authController.headStudentReport)
Router.post("/headInstructorReport", authController.headDataEntry)
Router.post("/headInstructorReport", authController.headMyAccount)
Router.post("/headInstructorReport", authController.headDownloads)
Router.post("/headInstructorReport", authController.headInstructorReport)
Router.post("/headInstructorReport", authController.headMyCourse)

Router.post("/headMyCourse", authController.head)
Router.post("/headMyCourse", authController.headCourseReport)
Router.post("/headMyCourse", authController.headStudentReport)
Router.post("/headMyCourse", authController.headDataEntry)
Router.post("/headMyCourse", authController.headMyAccount)
Router.post("/headMyCourse", authController.headDownloads)
Router.post("/headMyCourse", authController.headInstructorReport)
Router.post("/headMyCourse", authController.headMyCourse)

Router.post("/adminRegister", authController.Admin)




Router.post("/Admin", authController.login)
Router.post("/Dean", authController.login)
Router.post("/Head", authController.login)
Router.post("/Head", authController.head)
Router.post("/VC", authController.login)
Router.post("/index", authController.login)
module.exports = Router;