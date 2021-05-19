const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const Router = express.Router();
let User = require('../controllers/auth');

//let db = new sqlite3.Database('C:\\Users\\Asus\\Desktop\\Black cat\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {
//let db = new sqlite3.Database('E:/SPM_Advanced/DataSource/database.sqlite3', (err) => {
let db = new sqlite3.Database('E:\\Spring 2021 course work\\SPM_NEW3\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('pages: Connected to the in-memory SQlite database.');
});


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
Router.get("/headProgramReports", (req,res) => {

    res.render(`headProgramReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/student", (req,res) => {
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
                        let CurrentCgPA = Math.round(results[0].CGPA * 100) / 100;
                        console.log(CurrentCgPA)
                        res.render(`student`, {
                            StdentID: User.StdentID,
                            S_fname: User.S_fname,
                            S_lName: User.S_lName,
                            S_Gender: User.S_Gender,
                            S_DateOfBirth: User.S_DateOfBirth,
                            S_Email: User.S_Email,
                            S_Phone: User.S_Phone,
                            S_Address: User.S_Address,
                            StudentProfile: User.StudentProfile,
                            Major: User.Major,
                            Minor: User.Minor,
                            CurrentCgPA:CurrentCgPA,
                            achievedPLO: achievedPLO,
                            attemptedPLO: attemptedPLO,
                            successRate: successRate,
                            MinPloNo: MinPloNo,
                            MinPloName: MinPloName,
                            MaxPloNo: MaxPloNo,
                            MaxPloName: MaxPloName
                        })
                    }) }) }) }) })
});

Router.get("/Faculty", (req,res) => {
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
        res.render(`Faculty`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, program: program, countStudents: countStudents})
    })
});
Router.get("/Admin", (req,res) => {

    res.render(`Admin`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/Dean", (req,res) => {

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
            res.render(`Dean`, {
                FacultyID: User.FacultyID,
                F_fname: User.F_fname,
                F_lName: User.F_lName,
                F_Gender: User.F_Gender,
                F_DateOfBirth: User.F_DateOfBirth,
                F_Email: User.F_Email,
                F_Phone: User.F_Phone,
                F_Address: User.F_Address,
                FacultyProfile: User.FacultyProfile,
                DepartmentID: User.DepartmentID,
                Term_start_date: User.Term_start_date,
                Term_end_date: User.Term_end_date,
                H_Position: User.H_Position,
                department: department,
                DeptcountStudents: DeptcountStudents,
                program: program,
                progcountStudents: progcountStudents
            })
        })})
});
Router.get("/Head", (req,res) => {
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
            res.render(`Head`, {
                FacultyID: User.FacultyID,
                F_fname: User.F_fname,
                F_lName: User.F_lName,
                F_Gender: User.F_Gender,
                F_DateOfBirth: User.F_DateOfBirth,
                F_Email: User.F_Email,
                F_Phone: User.F_Phone,
                F_Address: User.F_Address,
                FacultyProfile: User.FacultyProfile,
                DepartmentID: User.DepartmentID,
                Term_start_date: User.Term_start_date,
                Term_end_date: User.Term_end_date,
                H_Position: User.H_Position,
                program: program,
                progcountStudents: progcountStudents,
                department: department,
                DeptcountStudents: DeptcountStudents
            })
        })
    })
});
Router.get("/VC", (req,res) => {
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


            db.all("SELECT d.SchoolID,COUNT(e.StudentID) AS c  FROM Enrollment_T e,Program_T p, Department_T d,School_T s WHERE e.ProgramID=p.ProgramID AND d.DepartmentID=p.DepartmentID AND d.SchoolID=s.SchoolID GROUP BY d.SchoolID", async(error, results) => {
                console.log(results)
                let school = []
                let schoolcountStudents = []
                for (let i = 0; i < results.length; ++i) {
                    school[i] = results[i].SchoolID;
                    schoolcountStudents[i] = results[i].c;

                }
                console.log(school)
                console.log(schoolcountStudents)
                res.render(`VC`, {
                    FacultyID: User.FacultyID,
                    F_fname: User.F_fname,
                    F_lName: User.F_lName,
                    F_Gender: User.F_Gender,
                    F_DateOfBirth: User.F_DateOfBirth,
                    F_Email: User.F_Email,
                    F_Phone: User.F_Phone,
                    F_Address: User.F_Address,
                    FacultyProfile: User.FacultyProfile,
                    DepartmentID: User.DepartmentID,
                    Term_start_date: User.Term_start_date,
                    Term_end_date: User.Term_end_date,
                    H_Position: User.H_Position,
                    school: school,
                    schoolcountStudents: schoolcountStudents,
                    program: program,
                    progcountStudents: progcountStudents,
                    department: department,
                    DeptcountStudents: DeptcountStudents
                })
            })
        })
    })

});
Router.get("/index", (req,res) => {

    res.render(`index`)
});
Router.get("/StudentCourses", (req,res) => {
    db.all("SELECT partOne.PLONo,SUM(partOne.CoPercentage) sumofCOPercentage, partOne.CONo FROM (SELECT COResult.CourseID,COResult.StudentID,COResult.CONo,COResult.total,COResult.achievedMark,p.PLONo  ,COResult.CoPercentage FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,  ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLONo GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) partOne GROUP BY partOne.PLONo,partOne.CONo", async(error, results) => {
        console.log(results)
        let co1 = []
        let co2 = []
        let co3 = []
        let co4 = []
        for(let i=0;i<results.length;++i){
            if(results[i].CONo == 1){
                co1.push(results[i].sumofCOPercentage)
            } else if(results[i].CONo == 2){
                co2.push(results[i].sumofCOPercentage)

            }else if(results[i].CONo == 3){
                co3.push(results[i].sumofCOPercentage)

            }else if(results[i].CONo == 4){
                co4.push(results[i].sumofCOPercentage)

            }
        }
        console.log(co1)
        console.log(co2)
        console.log(co3)
        console.log(co4)

        db.all("SELECT DISTINCT(e.EnrolledSem),p.ProgramID,COUNT(e.StudentID) AS c FROM Enrollment_T e,Program_T p WHERE e.ProgramID=p.ProgramID GROUP BY e.EnrolledSem,p.ProgramID", async(error, results) => {
            console.log(results)
            let sem = []
            let countStudents = []
            for(let i=0;i<results.length;++i){
                sem[i] = results[i].EnrolledSem;
                countStudents[i]=results[i].c;

            }
            console.log(sem)
            res.render(`StudentCourses`,{StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor, data: sem, count: countStudents, co1: co1, co2:co2, co3:co3, co4:co4 })
        }) })

});
Router.get("/studentReports", (req,res) => {
    db.all("SELECT (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) GPA ,s.Year,s.Semester FROM Registration_T r,Enrollment_T e,Section_T s WHERE r.SectionID =s.SectionID AND r.StudentID=100 GROUP BY s.Year,s.Semester,s.CourseID", async(error, results) => {
        console.log(results)
        let semYear = []
        let GPA = []
        for(let i=0;i<results.length;++i){
            semYear[i] = results[i].Semester + results[i].Year
            GPA[i] = results[i].GPA
        }
        console.log(semYear)
        console.log(GPA)
        res.render(`studentReports`, {
            StdentID: User.StdentID,
            S_fname: User.S_fname,
            S_lName: User.S_lName,
            S_Gender: User.S_Gender,
            S_DateOfBirth: User.S_DateOfBirth,
            S_Email: User.S_Email,
            S_Phone: User.S_Phone,
            S_Address: User.S_Address,
            StudentProfile: User.StudentProfile,
            Major: User.Major,
            Minor: User.Minor,
            semYear:semYear,
            GPA:GPA
        })
    })
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


Router.get("/DeanSchoolReports", (req,res) => {

    res.render(`DeanSchoolReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanDataEntry", (req,res) => {

    res.render(`DeanDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanDepartmentReports", (req,res) => {

    res.render(`DeanDepartmentReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanDownloads", (req,res) => {

    res.render(`DeanDownloads`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanMyAccount", (req,res) => {

    res.render(`DeanMyAccount`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanMyCourses", (req,res) => {

    res.render(`DeanMyCourses`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanProgramReports", (req,res) => {

    res.render(`DeanProgramReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCDataEntry", (req,res) => {

    res.render(`VCDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCDepartmentReports", (req,res) => {

    res.render(`VCDepartmentReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCDownloads", (req,res) => {

    res.render(`VCDownloads`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCMyAccount", (req,res) => {

    res.render(`VCMyAccount`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCMyCourses", (req,res) => {

    res.render(`VCMyCourses`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCProgramReports", (req,res) => {

    res.render(`VCProgramReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCSchoolReports", (req,res) => {

    res.render(`VCSchoolReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCInstructorReports", (req,res) => {

    res.render(`VCInstructorReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
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
    db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSE' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSE'", async(error, results) => {
        console.log(results)
        let CSEAvgCgpa = results[0].a;
        console.log(CSEAvgCgpa)
        db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CEN' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CEN'", async(error, results) => {
            console.log(results)
            let CENAvgCgpa = results[0].a;

            console.log(CENAvgCgpa)
            db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSC' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSC'", async(error, results) => {
                console.log(results)
                let CSCAvgCgpa = results[0].a;

                console.log(CSCAvgCgpa)
                res.render(`facultyStudentReport`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, CSCAvgCgpa: CSCAvgCgpa, CENAvgCgpa: CENAvgCgpa, CSEAvgCgpa: CSEAvgCgpa})
            })
        })
    })
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
Router.get("/headmap", (req,res) => {

    res.render(`headmap`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headevaluation", (req,res) => {

    res.render(`headevaluation`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
});
Router.get("/headassesment", (req,res) => {

    res.render(`headassesment`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, Term_start_date: User.Term_start_date,Term_end_date: User.Term_end_date, H_Position: User.H_Position})
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