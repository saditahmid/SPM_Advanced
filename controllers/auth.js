
const sqlite3 = require("sqlite3").verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let User = 12;
module.exports.User = User;
//let db = new sqlite3.Database('C:\\Users\\Asus\\Desktop\\Black cat\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {
//let db = new sqlite3.Database('E:/SPM_Advanced/DataSource/database.sqlite3', (err) => {
let db = new sqlite3.Database('E:\\Spring 2021 course work\\SPM_NEW4\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {

//let db = new sqlite3.Database('/home/tahmid/Git/SPM_Advanced/DataSource/database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('auth:Connected to the in-memory SQlite database.');
});

exports.login = async(req, res) =>{

    try{
        console.log(User);
        console.log(req.body);


        const userId = req.body.userId;
        module.exports.userId = userId;

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

                    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
                        console.log("hello, the results: ")
                        console.log(results)
                        let PLONo = []
                        let PLOpercentage = []
                        for(let i=0;i<results.length;++i){
                            PLONo[i] = results[i].PLONo;
                            PLOpercentage[i]=results[i].PLOpercentage;

                        }




                    db.all("SELECT COUNT(CountOfAchieved.PLONo) AS c FROM(SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total , COResult.achievedMark achievedMark ,p.PLONo  FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND e.RegistrationID=r.RegistrationID AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl  WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo HAVING (PLOpercentage>=40)) CountOfAchieved", async(error, results) => {
                        console.log(results)
                        let achievedPLO = results[0].c;
                        console.log(achievedPLO)

                        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM(SELECT PLOrawMarks.PLONo FROM (SELECT COResult.CourseID courseID,COResult.CONo coNo,p.PLONo FROM (SELECT c.CourseID,c.CONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOCount", async(error, results) => {
                            console.log(results)
                            let attemptedPLO = results[0].c;
                            console.log(attemptedPLO)
                            let successRate = (achievedPLO/attemptedPLO)*100;
                            console.log(successRate + "%");

                            db.all("SELECT minT.PLONo,MIN(minT.PLOpercentage),ploT.PLOName FROM (SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A  FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,   COResult.achievedMark achievedMark ,p.PLONo  FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,  ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID  AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo) minT, PLO_T ploT,Mapping_T mapT WHERE mapT.PLOID=ploT.PLOID AND ploT.PLONo=minT.PLONo", async(error, results) => {
                                console.log(results)
                                let MinPloNo = results[0].PLONo;
                                let MinPloName = results[0].PLOName;
                                console.log(MinPloNo)
                                console.log(MinPloName)

                                db.all("SELECT maxT.PLONo,Max(maxT.PLOpercentage),ploT.PLOName FROM(SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total , COResult.achievedMark achievedMark ,p.PLONo FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo) maxT, PLO_T ploT,Mapping_T mapT WHERE mapT.PLOID=ploT.PLOID AND ploT.PLONo=maxT.PLONo", async(error, results) => {
                                    console.log(results)
                                    let MaxPloNo = results[0].PLONo;
                                    let MaxPloName = results[0].PLOName;
                                    console.log(MaxPloNo)
                                    console.log(MaxPloName)


                                    db.all("SELECT SUM(procsssA.stepOne)/SUM(R.AchievedCredit) CGPA FROM(SELECT (r.GradePoint*r.AchievedCredit) stepOne FROM Registration_T r WHERE r.StudentID=100) procsssA,Registration_T R WHERE R.StudentID=100", async(error, results) => {
                                        console.log(results)
                                        let CurrentCgPA = Math.round(results[0].CGPA*100)/100;
                                        console.log(CurrentCgPA)

                                        db.get("SELECT StdentID, S_fname, S_lName, S_Gender, S_DateOfBirth, S_Email, S_Phone,S_Address, StudentProfile, Major, Minor from student_T WHERE StdentID = ?",[id], async(error, results) => {
                                            if(error){
                                                console.log(error)
                                            }else{
                                                console.log(results.StdentID);
                                                module.exports.StdentID = results.StdentID;
                                                module.exports.S_fname = results.S_fname;
                                                module.exports.S_lName = results.S_lName;
                                                module.exports.S_Gender = results.S_Gender;
                                                module.exports.S_DateOfBirth = results.S_DateOfBirth;
                                                module.exports.S_Email = results.S_Email;
                                                module.exports.S_Phone = results.S_Phone;
                                                module.exports.S_Address = results.S_Address;
                                                module.exports.StudentProfile = results.StudentProfile;
                                                module.exports.Major = results.Major;
                                                module.exports.Minor = results.Minor;
                                                res.render("\student", {StdentID: results.StdentID, S_fname: results.S_fname, S_lName: results.S_lName,
                                                    S_Gender:results.S_Gender, S_DateOfBirth:results.S_DateOfBirth,
                                                    S_Email:results.S_Email, S_Phone:results.S_Phone,
                                                    S_Address:results.S_Address, StudentProfile:results.StudentProfile,
                                                    Major:results.Major, Minor:results.Minor,
                                                    CurrentCgPA:CurrentCgPA,
                                                    achievedPLO: achievedPLO,
                                                    attemptedPLO: attemptedPLO,
                                                    successRate: successRate,
                                                    MinPloNo: MinPloNo,
                                                    MinPloName: MinPloName,
                                                    MaxPloNo: MaxPloNo,
                                                    MaxPloName: MaxPloName,
                                                    PLONo:PLONo,
                                                    PLOpercentage:PLOpercentage









                                                });


                                            }

                                        }) }) }) }) }) }) })



                }else if((results.UserType) == "Faculty" ){
                    const id = results.UserID;
                    let bla = [13, 11, 12];
                    const token = jwt.sign({id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    console.log("The token is " + token);
                    const cookieOptions = {expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                        ), httpOnly: true}
                    res.cookie('jwt', token, cookieOptions);

                    db.all("SELECT p.ProgramID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p WHERE e.ProgramID=p.ProgramID AND p.DepartmentID='CSE' GROUP BY p.ProgramID", async(error, results) => {
                        console.log(results)
                        let program = []
                        let countStudents = []
                        for(let i=0;i<results.length;++i){
                            program[i] = results[i].ProgramID;
                            countStudents[i]=results[i].c;

                        }
                        console.log(program)
                        console.log(countStudents)



                        db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[id], async(error, results) => {
                            if(error){
                                console.log(error)
                            }else{
                                console.log("This is inside another fuction: " + program)
                                console.log(results.FacultyID);
                                module.exports.FacultyID = results.FacultyID;
                                module.exports.F_fname = results.F_fname;
                                module.exports.F_lName = results.F_lName;
                                module.exports.F_Gender = results.F_Gender;
                                module.exports.F_DateOfBirth = results.F_DateOfBirth;
                                module.exports.F_Email = results.F_Email;
                                module.exports.F_Phone = results.F_Phone;
                                module.exports.F_Address = results.F_Address;
                                module.exports.FacultyProfile = results.FacultyProfile;
                                module.exports.DepartmentID = results.DepartmentID;

                                res.render("\Faculty", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID, program: program, countStudents: countStudents});


                            }

                        })
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
                            module.exports.AdminID = results.AdminID;
                            module.exports.A_F_Name = results.A_F_Name;
                            module.exports.A_L_Name = results.A_L_Name;
                            module.exports.A_Gender = results.A_Gender;
                            module.exports.A_DateOfBirth = results.A_DateOfBirth;
                            module.exports.A_Email = results.A_Email;
                            module.exports.A_Phone = results.A_Phone;
                            module.exports.A_Address = results.A_Address;
                            module.exports.AdminProfile = results.AdminProfile;

                            res.render("\Admin", {AdminID:results.AdminID, A_F_Name:results.A_F_Name, A_L_Name:results.A_L_Name, A_Gender:results.A_Gender, A_DateOfBirth:results.A_DateOfBirth, A_Email:results.A_Email, A_Phone:results.A_Phone,A_Address:results.A_Address, AdminProfile:results.AdminProfile});


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
                            const id = results.FacultyID;
                            module.exports.Term_start_date = results.Term_start_date;
                            module.exports.Term_end_date = results.Term_end_date;
                            module.exports.H_Position = results.H_Position;

                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.all("SELECT p.ProgramID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p WHERE e.ProgramID=p.ProgramID AND p.DepartmentID='CSE' GROUP BY p.ProgramID", async(error, results) => {
                                console.log(results)
                                let program = []
                                let progcountStudents = []
                                for(let i=0;i<results.length;++i){
                                    program[i] = results[i].ProgramID;
                                    progcountStudents[i]=results[i].c;

                                }
                                console.log(program)
                                console.log(progcountStudents)
                                db.all("SELECT d.DepartmentID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p, Department_T d WHERE e.ProgramID=p.ProgramID AND d.DepartmentID=p.DepartmentID AND d.SchoolID='SETS' GROUP BY d.DepartmentID", async(error, results) => {
                                    console.log(results)
                                    let department = []
                                    let DeptcountStudents = []
                                    for(let i=0;i<results.length;++i){
                                        department[i] = results[i].DepartmentID;
                                        DeptcountStudents[i]=results[i].c;

                                    }
                                    console.log(department)
                                    console.log(DeptcountStudents)
                                    db.all("SELECT d.SchoolID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p, Department_T d,School_T s WHERE e.ProgramID=p.ProgramID AND d.DepartmentID=p.DepartmentID AND d.SchoolID=s.SchoolID GROUP BY d.SchoolID", async(error, results) => {
                                        console.log(results)
                                        let school = []
                                        let schoolcountStudents = []
                                        for (let i = 0; i < results.length; ++i) {
                                            school[i] = results[i].SchoolID;
                                            schoolcountStudents[i] = results[i].c;

                                        }
                                        console.log(school)
                                        console.log(schoolcountStudents)
                                        db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[id], async(error, results, id) => {
                                            if(error){
                                                console.log(error)
                                            }else{

                                                console.log(results.FacultyID);
                                                module.exports.FacultyID = results.FacultyID;
                                                module.exports.F_fname = results.F_fname;
                                                module.exports.F_lName = results.F_lName;
                                                module.exports.F_Gender = results.F_Gender;
                                                module.exports.F_DateOfBirth = results.F_DateOfBirth;
                                                module.exports.F_Email = results.F_Email;
                                                module.exports.F_Phone = results.F_Phone;
                                                module.exports.F_Address = results.F_Address;
                                                module.exports.FacultyProfile = results.FacultyProfile;
                                                module.exports.DepartmentID = results.DepartmentID;
                                                res.render("\VC", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID, school: school, schoolcountStudents: schoolcountStudents,program: program, progcountStudents: progcountStudents, department: department, DeptcountStudents: DeptcountStudents});


                                            }

                                        })
                                    }) }) })

                        }else if(results.H_Position == "Department Head" ){
                            const id = results.FacultyID;
                            module.exports.Term_start_date = results.Term_start_date;
                            module.exports.Term_end_date = results.Term_end_date;
                            module.exports.H_Position = results.H_Position;
                            let H_Position = results.H_Position;
                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.all("SELECT p.ProgramID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p WHERE e.ProgramID=p.ProgramID AND p.DepartmentID='CSE' GROUP BY p.ProgramID", async(error, results) => {
                                console.log(results)
                                let program = []
                                let progcountStudents = []
                                for(let i=0;i<results.length;++i){
                                    program[i] = results[i].ProgramID;
                                    progcountStudents[i]=results[i].c;

                                }
                                console.log(program)
                                console.log(progcountStudents)
                                db.all("SELECT d.DepartmentID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p, Department_T d WHERE e.ProgramID=p.ProgramID AND d.DepartmentID=p.DepartmentID AND d.SchoolID='SETS' GROUP BY d.DepartmentID", async(error, results) => {
                                    console.log(results)
                                    let department = []
                                    let DeptcountStudents = []
                                    for(let i=0;i<results.length;++i){
                                        department[i] = results[i].DepartmentID;
                                        DeptcountStudents[i]=results[i].c;

                                    }
                                    console.log(department)
                                    console.log(DeptcountStudents)

                                    db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[id], async(error, results) => {
                                        if(error){
                                            console.log(error)
                                        }else{
                                            console.log(results.FacultyID);
                                            module.exports.FacultyID = results.FacultyID;
                                            module.exports.F_fname = results.F_fname;
                                            module.exports.F_lName = results.F_lName;
                                            module.exports.F_Gender = results.F_Gender;
                                            module.exports.F_DateOfBirth = results.F_DateOfBirth;
                                            module.exports.F_Email = results.F_Email;
                                            module.exports.F_Phone = results.F_Phone;
                                            module.exports.F_Address = results.F_Address;
                                            module.exports.FacultyProfile = results.FacultyProfile;
                                            module.exports.DepartmentID = results.DepartmentID;
                                            res.render("\Head", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID, program: program, progcountStudents: progcountStudents, department: department, DeptcountStudents: DeptcountStudents, H_Position: H_Position });


                                        }

                                    })  }) })

                        }else if(results.H_Position == "Dean"){
                            const id = results.FacultyID;
                            module.exports.Term_start_date = results.Term_start_date;
                            module.exports.Term_end_date = results.Term_end_date;
                            module.exports.H_Position = results.H_Position;
                            const token = jwt.sign({id}, process.env.JWT_SECRET,{
                                expiresIn: process.env.JWT_EXPIRES_IN

                            });
                            console.log("The token is " + token);
                            const cookieOptions = {expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                                ), httpOnly: true}
                            res.cookie('jwt', token, cookieOptions);
                            db.all("SELECT p.ProgramID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p WHERE e.ProgramID=p.ProgramID AND p.DepartmentID='CSE' GROUP BY p.ProgramID", async(error, results) => {
                                console.log(results)
                                let program = []
                                let progcountStudents = []
                                for(let i=0;i<results.length;++i){
                                    program[i] = results[i].ProgramID;
                                    progcountStudents[i]=results[i].c;

                                }
                                console.log(program)
                                console.log(progcountStudents)
                                db.all("SELECT d.DepartmentID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p, Department_T d WHERE e.ProgramID=p.ProgramID AND d.DepartmentID=p.DepartmentID AND d.SchoolID='SETS' GROUP BY d.DepartmentID", async(error, results) => {
                                    console.log(results)
                                    let department = []
                                    let DeptcountStudents = []
                                    for (let i = 0; i < results.length; ++i) {
                                        department[i] = results[i].DepartmentID;
                                        DeptcountStudents[i] = results[i].c;

                                    }
                                    console.log(department)
                                    console.log(DeptcountStudents)
                                    db.get("SELECT FacultyID, F_fname, F_lName, F_Gender, F_DateOfBirth, F_Email, F_Phone,F_Address, FacultyProfile, DepartmentID from Faculty_T WHERE FacultyID = ?",[id], async(error, results) => {
                                        if(error){
                                            console.log(error)
                                        }else{
                                            console.log(results.FacultyID);
                                            module.exports.FacultyID = results.FacultyID;
                                            module.exports.F_fname = results.F_fname;
                                            module.exports.F_lName = results.F_lName;
                                            module.exports.F_Gender = results.F_Gender;
                                            module.exports.F_DateOfBirth = results.F_DateOfBirth;
                                            module.exports.F_Email = results.F_Email;
                                            module.exports.F_Phone = results.F_Phone;
                                            module.exports.F_Address = results.F_Address;
                                            module.exports.FacultyProfile = results.FacultyProfile;
                                            module.exports.DepartmentID = results.DepartmentID;
                                            res.render("\Dean", {FacultyID: results.FacultyID,  F_fname: results.F_fname, F_lName:results.F_lName, F_Gender:results.F_Gender, F_DateOfBirth:results.F_DateOfBirth, F_Email:results.F_Email, F_Phone:results.F_Phone,F_Address:results.F_Address, FacultyProfile:results.FacultyProfile, DepartmentID:results.DepartmentID, Term_start_date: results.Term_start_date,Term_end_date: results.Term_end_date, H_Position: results.H_Position, department: department, DeptcountStudents: DeptcountStudents, program: program, progcountStudents: progcountStudents});


                                        }

                                    })
                                })
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
