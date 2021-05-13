const express = require("express");
const Router = express.Router();
let User = require('../controllers/auth');



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

    res.render(`student`, {StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor})
});

Router.get("/Faculty", (req,res) => {

    res.render(`Faculty`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/Admin", (req,res) => {

    res.render(`Admin`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/Dean", (req,res) => {

    res.render(`Dean`,{FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/Head", (req,res) => {

    res.render(`Head`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/VC", (req,res) => {

    res.render(`VC`,{FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/index", (req,res) => {

    res.render(`index`)
});
Router.get("/StudentCourses", (req,res) => {

    res.render(`StudentCourses`,{StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor})
});
Router.get("/studentReports", (req,res) => {

    res.render(`studentReports`, {StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor})
});
Router.get("/studentDownloads", (req,res) => {

    res.render(`studentDownloads`, {StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor})
});
Router.get("/studentMyAccounts", (req,res) => {

    res.render(`studentMyAccounts`, {StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor})
});
Router.get("/contactUs", (req,res) => {

    res.render(`contactUs`)
});



Router.get("/facultyCourses", (req,res) => {

    res.render(`facultyCourses`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/facultyDataEntry", (req,res) => {

    res.render(`facultyDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/seeAllStudents", (req,res) => {

    res.render(`seeAllStudents`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/facultyStudentReport", (req,res) => {

    res.render(`facultyStudentReport`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/facultyDownloads", (req,res) => {

    res.render(`facultyDownloads`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/facultyMyAccount", (req,res) => {

    res.render(`facultyMyAccount`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});



Router.get("/headCourseReport", (req,res) => {

    res.render(`headCourseReport`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headDataEntry", (req,res) => {

    res.render(`headDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headDownloads", (req,res) => {

    res.render(`headDownloads`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headInstructorReport", (req,res) => {

    res.render(`headInstructorReport`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headMyCourse", (req,res) => {

    res.render(`headMyCourse`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headSeeAllStudents", (req,res) => {

    res.render(`headSeeAllStudents`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headMyAccount", (req,res) => {

    res.render(`headMyAccount`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headStudentReport", (req,res) => {

    res.render(`headStudentReport`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headDownloads", (req,res) => {

    res.render(`headDownloads`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/adminRegister", (req,res) => {

    res.render(`adminRegister`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/adminDepartmentWise", (req,res) => {

    res.render(`adminDepartmentWise`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/adminSchoolWise", (req,res) => {

    res.render(`adminSchoolWise`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/adminProgramWise", (req,res) => {

    res.render(`adminProgramWise`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/adminMyAccount", (req,res) => {

    res.render(`adminMyAccount`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/adminStudentEnrolled", (req,res) => {

    res.render(`adminStudentEnrolled`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

module.exports = Router;