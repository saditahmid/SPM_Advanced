const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = express.Router();

let User;


let db = new sqlite3.Database('E:/Spring 2021 course work/SPM-NEW/SPM_Advanced/appMain/base/DataSource/database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

exports.login = async(req, res) =>{
    try{
        console.log(User);
        console.log(req.body);


        const userId = req.body.userId;
        User = req.body.userId;
        const password = req.body.password;
        console.log("The user has changed to " + User);
      if(!userId || !password){
          return res.status(400).render('login',{
              message: 'Please provide an ID or password'
          })
      }
        db.serialize(function(){

            db.get("SELECT UserID,UserType,UserPass from User_T WHERE UserID = ?",[userId], async(error, results) => {

                console.log(results)
                if(!(results) || !(await bcrypt.compare(password, results.UserPass)))
                {res.status(401).render('login',{
                    message: 'ID or Password is incorrect'
                });} else if((results.UserType) == "Student"){
                    const id = results.UserID;
                    const token = jwt.sign({id}, process.env.JWT_SECRET,{
                         expiresIn: process.env.JWT_EXPIRES_IN

                    });
                    console.log("The token is " + token);
                    const cookieOptions = {expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                    ), httpOnly: true}
                    res.cookie('jwt', token, cookieOptions);

                    db.get("SELECT StdentID, S_fname, S_lName, S_Gender, S_DateOfBirth, S_Email, S_Phone,S_Address, StudentProfile, Major, Minor from student_T WHERE StdentID = ?",[results.UserID], async(error, results) => {
                        if(error){
                            console.log(error)
                        }else{
                            console.log(results.StdentID);
                            res.render("E:\\Spring 2021 course work\\nawar\\views\\student.hbs", {StdentID: results.StdentID, S_fname: results.S_fname, S_lName: results.S_lName, S_Gender:results.S_Gender, S_DateOfBirth:results.S_DateOfBirth, S_Email:results.S_Email, S_Phone:results.S_Phone,S_Address:results.S_Address, StudentProfile:results.StudentProfile, Major:results.Major, Minor:results.Minor});


                        }

                    })



                }else if((results.UserType) == "Faculty" ){
                    const id = results.UserID;
                    const token = jwt.sign({id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    console.log("The token is " + token);
                    const cookieOptions = {expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                        ), httpOnly: true}
                    res.cookie('jwt', token, cookieOptions);

                    db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[results.UserID], async(error, results) => {
                        if(error){
                            console.log(error)
                        }else{
                            console.log(results.FacultyID);
                            res.render("E:\\Spring 2021 course work\\nawar\\views\\Faculty.hbs", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID});


                        }

                    })

                }else if((results.UserType) == "Admin" ){
                    const id = results.UserID;
                    const token = jwt.sign({id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRES_IN

                    });
                    console.log("The token is " + token);
                    const cookieOptions = {expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                        ), httpOnly: true}
                    res.cookie('jwt', token, cookieOptions);
                    db.get("SELECT AdminID, A_F_Name, A_L_Name, A_Gender, A_DateOfBirth, A_Email, A_Phone,A_Address, AdminProfile from Admin_T WHERE AdminID = ?",[results.UserID], async(error, results) => {
                        if(error){
                            console.log(error)
                        }else{
                            console.log(results.AdminID);
                            res.render("E:\\Spring 2021 course work\\nawar\\views\\Admin.hbs", {AdminID:results.AdminID, A_F_Name:results.A_F_Name, A_L_Name:results.A_L_Name, A_Gender:results.A_Gender, A_DateOfBirth:results.A_DateOfBirth, A_Email:results.A_Email, A_Phone:results.A_Phone,A_Address:results.A_Address, AdminProfile:results.AdminProfile});


                        }

                    })


                }else if((results.UserType) == "Higher Authority" ){
                    const id = results.UserID;
                    const token = jwt.sign({id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRES_IN

                    });
                    console.log("The token is " + token);
                    const cookieOptions = {expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                        ), httpOnly: true}
                    res.cookie('jwt', token, cookieOptions);
                    db.get("SELECT HigherAuthorityID,Term_start_date, Term_end_date, H_Position, FacultyID from HigherAuthority_T WHERE FacultyID = ?",[results.UserID], async(error, results) => {
                        if(error){console.log(error);}else if(results.H_Position == "VC"){
                            const id = results.UserID;
                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[results.FacultyID], async(error, results) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    console.log(results.FacultyID);
                                    res.render("E:\\Spring 2021 course work\\nawar\\views\\VC.hbs", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID});


                                }

                            })

                        }else if(results.H_Position == "Department Head" ){
                            const id = results.UserID;
                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[results.FacultyID], async(error, results) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    console.log(results.FacultyID);
                                    res.render("E:\\Spring 2021 course work\\nawar\\views\\Head.hbs", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID});


                                }

                            })

                        }else if(results.H_Position == "Dean"){
                            const id = results.UserID;
                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[results.FacultyID], async(error, results) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    console.log(results.FacultyID);
                                    res.render("E:\\Spring 2021 course work\\nawar\\views\\Dean.hbs", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID});


                                }

                            })

                        }

                    })



                }








            })






        })
    }catch (error) {
      console.log(error)
    }

}


exports.student = (req, res)=>{
console.log(req.body.SPM)

}

exports.StudentCourses  = (req, res)=>{

}
exports.studentReports =(req, res)=>{

}
exports.Faculty =(req, res)=>{

}
exports.facultyCourses =(req, res)=>{

}
exports.facultyDataEntry =(req, res)=>{

}
exports.seeAllCourses =(req, res)=>{

}
exports.facultyStudentReport =(req, res)=>{

}
exports.facultyDownloads =(req, res)=>{

}
exports.facultyMyAccount =(req, res)=>{

}
exports.headMyAccount =(req, res)=>{

}
exports.head =(req, res)=>{

}
exports.headMyCourse =(req, res)=>{

}
exports.headInstructorReport =(req, res)=>{

}
exports.headStudentReport =(req, res)=>{

}
exports.headSeeAllStudents =(req, res)=>{

}
exports.headDownloads =(req, res)=>{

}
exports.headDataEntry =(req, res)=>{

}
exports.headCourseReport =(req, res)=>{

}
exports.Admin =(req, res)=>{

}


exports.register = (req, res) =>{
    console.log(req.body);
    const User_ID = req.body.User_ID;
    const UserType = req.body.UserType;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Gender = req.body.Gender;
    const BirthDate = req.body.BirthDate    ;
    const Email       = req.body.Email    ;
    const Phone       = req.body.Phone    ;
    const Address       = req.body.Address    ;
    const UrlPic = req.body.UrlPic    ;
    const Position  = req.body.Position;
    const Higher_Start_Term_Date = req.body.Higher_Start_Term_Date;
    const Higher_End_Term_Date = req.body.Higher_End_Term_Date;
    const DepartmentID = req.body.DepartmentID;
    const Student_Major = req.body.Student_Major;
    const Student_Minor = req.body.Student_Minor;

    console.log(User_ID);
    db.serialize(function() {
        db.run("SELECT UserID from User_T WHERE UserID = ?", [User_ID], async (error, results) => {
            if (error) {
                console.log("error");
            }
            if (results > 0) {
                return res.render('register', {
                    message: "This Id is already in use"
                });
            } else if (password !== confirm_password) {
                return res.render('register', {
                    message: "The passwords do not match"
                });
            }
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            let run = db.run('INSERT INTO User_T(UserID, UserType, UserPass) VALUES(?,?,?)', [User_ID,UserType, hashedPassword]
           , (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(results);

                }
            })
          if(UserType == "Faculty"){
              let run1 = db.run('INSERT INTO Faculty_T(FacultyID, F_fname, F_lname, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID) VALUES(?,?,?,?,?,?,?,?,?,?)', [User_ID, FirstName, LastName, Gender, BirthDate, Email, Phone, Address, UrlPic, DepartmentID]
                  , (error, results) => {
                      if (error) {
                          console.log(error)
                      } else {
                          console.log(results);
                          return res.render('register', {
                              message: "User registered"
                          });

                      }
                  })
          }else if(UserType == "Student"){
              let run1 = db.run('INSERT INTO Student_T(StdentID, S_fname, S_lname, S_Gender, S_DateOfBirth, S_Email, S_Phone,S_Address, StudentProfile, Major, Minor) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [User_ID, FirstName, LastName, Gender, BirthDate, Email, Phone, Address, UrlPic, Student_Major, Student_Minor]
                  , (error, results) => {
                      if (error) {
                          console.log(error)
                      } else {
                          console.log(results);
                          return res.render('register', {
                              message: "User registered"
                          });

                      }
                  })


          }else if(UserType == "Admin"){
              let run1 = db.run('INSERT INTO Admin_T(AdminID, A_F_Name, A_L_Name, A_Gender, A_DateOfBirth, A_Email, A_Phone,A_Address, AdminProfile) VALUES(?,?,?,?,?,?,?,?,?)', [User_ID, FirstName, LastName, Gender, BirthDate, Email, Phone, Address, UrlPic]
                  , (error, results) => {
                      if (error) {
                          console.log(error)
                      } else {
                          console.log(results);
                          return res.render('register', {
                              message: "User registered"
                          });

                      }
                  })

          }else if(UserType == "Higher Authority"){
              let run1 = db.run('INSERT INTO Faculty_T(FacultyID, F_fname, F_lname, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID) VALUES(?,?,?,?,?,?,?,?,?,?)', [User_ID, FirstName, LastName, Gender, BirthDate, Email, Phone, Address, UrlPic, DepartmentID]
                  , (error, results) => {
                      if (error) {
                          console.log(error)
                      } else {
                          console.log(results);


                      }
                  })
              let run2 = db.run('INSERT INTO HigherAuthority_T(Term_start_date, Term_end_date, H_Position, FacultyID) VALUES(?,?,?,?)', [Higher_Start_Term_Date, Higher_End_Term_Date, Position, User_ID]
                  , (error, results) => {
                      if (error) {
                          console.log(error)
                      } else {
                          console.log(results);
                          return res.render('register', {
                              message: "User registered"
                          });

                      }
                  })




          }
        })

    })
}
