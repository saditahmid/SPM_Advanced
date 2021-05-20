const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const Router = express.Router();
let User = require('../controllers/auth');

//let db = new sqlite3.Database('C:\\Users\\Asus\\Desktop\\Black cat\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {
let db = new sqlite3.Database('./DataSource/database.sqlite3', (err) => {
//let db = new sqlite3.Database('E:\\Spring 2021 course work\\SPM_NEW4\\SPM_Advanced\\DataSource\\database.sqlite3', (err) => {
//let db = new sqlite3.Database('/home/tahmid/Git/SPM_Advanced/DataSource/database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('pages: Connected to the in-memory SQlite .');
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
    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSC'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
        console.log(results)

        let CSCCGPA = results[0].CGPA;


        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CEN'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
            console.log(results)


            let CENCGPA = results[0].CGPA;


            db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSE'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                console.log(results)
                let CSECGPA = results[0].CGPA;





    db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE309' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
        console.log(results)
        let students309 = []
        let achievedNOPLO309 =[]

        for(let i=0;i<results.length;++i){
            students309[i] = results[i].StudentID;
            achievedNOPLO309[i] = results[i].achievedNoPlo;
        }



        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE309' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
            console.log(results)
            let attempted309 = results[0].c

            db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
                console.log(results)
                let students303 = [];
                let achievedNOPLO303 = [];

                for(let i=0;i<results.length;++i){
                    students303[i] = results[i].StudentID;
                    achievedNOPLO303[i] = results[i].achievedNoPlo;
                }
                console.log(achievedNOPLO303)


                db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE303' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
                    console.log(results)
                    let attempted303 = results[0].c
                    res.render(`headProgramReports`, {
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
                        students309:students309,
                        achievedNOPLO309:achievedNOPLO309,
                        attempted309:attempted309,
                        students303:students303,
                        achievedNOPLO303:achievedNOPLO303,
                        attempted303:attempted303,
                        CSECGPA: CSECGPA,
                        CENCGPA: CENCGPA,
                        CSCCGPA: CSCCGPA
                    })
                }) }) }) }) }) }) })
});
Router.get("/student", (req,res) => {

    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {

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
                            MaxPloName: MaxPloName,
                            PLONo:PLONo,
                            PLOpercentage:PLOpercentage

                        })
                    }) }) }) }) }) })
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
    db.all("SELECT partTwo.PLONo, (partTwo.sumofCOPercentage/1000) percentageOfCO , partTwo.CONo FROM(SELECT partOne.PLONo,SUM(partOne.CoPercentage) sumofCOPercentage, partOne.CONo FROM (SELECT COResult.CourseID,COResult.StudentID,COResult.CONo,COResult.total,COResult.achievedMark,p.PLONo ,COResult.CoPercentage FROM(SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,    ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID    GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) partOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =partOne.coNo AND pl.PLONo=partOne.PLONo GROUP BY partOne.PLONo,partOne.CONo) partTwo,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =partTwo.coNo AND pl.PLONo=partTwo.PLONo GROUP BY partTwo.PLONo,partTwo.CONo", async(error, results) => {
        console.log(results)
        let co1 = []
        let co2 = []
        let co3 = []
        let co4 = []
        let PLONo = []

        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo
            if(results[i].CONo == 1){
                co1.push(Math.round(results[i].percentageOfCO*100)/100)
            } else if(results[i].CONo == 2){
                co2.push(Math.round(results[i].percentageOfCO*100)/100)

            }else if(results[i].CONo == 3){
                co3.push(Math.round(results[i].percentageOfCO*100)/100)

            }else if(results[i].CONo == 4){
                co4.push(Math.round(results[i].percentageOfCO*100)/100)

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
            res.render(`StudentCourses`,{StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor, data: sem, count: countStudents, co1: co1, co2:co2, co3:co3, co4:co4, PLONo: PLONo })
        }) })

});
Router.get("/studentReports", (req,res) => {
    db.all(`SELECT c.CourseID,c.CONo,
                   ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage
            FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r
            WHERE c.AssessmentID=a.AssessmentID
              AND c.AssessmentID= e.AssessmentID
              AND e.RegistrationID=r.RegistrationID
              AND r.StudentID=100
            GROUP BY c.CourseID ,c.CONo
    `, async(error, results) => {
        console.log(results)



    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,   COResult.achievedMark achievedMark ,p.PLONo FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,    ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage   FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl  WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
        console.log(results)
        let studPLOPercentage = [];
        for(let i=0;i<results.length;++i){
            studPLOPercentage[i] = results[i].PLOpercentage
        }
        console.log(studPLOPercentage)

        db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total , COResult.achievedMark achievedMark ,p.PLONo FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Enrollment_T en,Program_T pr   WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND e.RegistrationID=r.RegistrationID   AND r.StudentID=en.StudentID  AND en.ProgramID=pr.ProgramID   AND pr.DepartmentID='CSE'     GROUP BY r.StudentID,c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p,Registration_T R,  Enrollment_T EN,Program_T PR,Evaluation_T EV  WHERE m.PLOID=p.PLOID  AND EV.RegistrationID=R.RegistrationID AND R.StudentID=EN.StudentID  AND EN.ProgramID=PR.ProgramID  AND PR.DepartmentID='CSE'  GROUP BY COResult.StudentID,m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,  Mapping_T M,PLO_T pl,Registration_T reg,Enrollment_T enr,Program_T pro,Evaluation_T eva WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo AND eva.RegistrationID=reg.RegistrationID  AND reg.StudentID=enr.StudentID AND enr.ProgramID=pro.ProgramID AND pro.DepartmentID='CSE' GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
            console.log(results)
            let deptPLOPercentage = [];
            let PLONo = [];
            for(let i=0;i<results.length;++i){
                deptPLOPercentage[i] = results[i].PLOpercentage
                PLONo[i] = results[i].PLONo;
            }

            console.log(deptPLOPercentage)
            console.log(PLONo)

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
            GPA:GPA,
            deptPLOPercentage:deptPLOPercentage,
            PLONo:PLONo,
            studPLOPercentage:studPLOPercentage
        })
    }) }) }) })
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
    db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
        console.log(results)
        let PLONo303 = []
        let avgPloPercentage303 = []
        for(let i=0;i<results.length;++i){
            PLONo303[i] = Math.round(results[i].PLONo*100)/100;
            avgPloPercentage303[i] = Math.round(results[i].c*100)/100;
        }
        console.log(PLONo303)
        console.log(avgPloPercentage303)

        db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE450' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
            console.log(results)
            let PLONo450 = []
            let avgPloPercentage450 = []
            for (let i = 0; i < results.length; ++i) {
                PLONo450[i] = Math.round(results[i].PLONo * 100) / 100;
                avgPloPercentage450[i] = Math.round(results[i].c * 100) / 100;
            }
            res.render(`DeanMyCourses`, {
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
                PLONo303:PLONo303,
                avgPloPercentage303:avgPloPercentage303,
                PLONo450:PLONo450,
                avgPloPercentage450:avgPloPercentage450,
            })
        }) })
});
Router.get("/DeanProgramReports", (req,res) => {

    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSC'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
        console.log(results)

let CSCCGPA = results[0].CGPA;


    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CEN'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
        console.log(results)


        let CENCGPA = results[0].CGPA;


        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSE'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
            console.log(results)
            let CSECGPA = results[0].CGPA;




    db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE450' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
        console.log(results)
        let students450 = []
        let achievedNOPLO450 =[]

        for(let i=0;i<results.length;++i){
            students450[i] = results[i].StudentID;
            achievedNOPLO450[i] = results[i].achievedNoPlo;
        }



        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE450' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
            console.log(results)
            let attempted450 = results[0].c

            db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
                console.log(results)
                let students303 = [];
                let achievedNOPLO303 = [];

                for(let i=0;i<results.length;++i){
                    students303[i] = results[i].StudentID;
                    achievedNOPLO303[i] = results[i].achievedNoPlo;
                }
                console.log(achievedNOPLO303)


                db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE303' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
                    console.log(results)
                    let attempted303 = results[0].c
                    res.render(`DeanProgramReports`, {
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
                        students450:students450,
                        achievedNOPLO450:achievedNOPLO450,
                        attempted450:attempted450,
                        students303:students303,
                        achievedNOPLO303:achievedNOPLO303,
                        attempted303:attempted303,
                        CSECGPA: CSECGPA,
                        CENCGPA: CENCGPA,
                        CSCCGPA: CSCCGPA


                    })
                }) }) }) }) }) }) })
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
    db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE343' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
        console.log(results)
        let PLONo343 = []
        let avgPloPercentage343 = []
        for(let i=0;i<results.length;++i){
            PLONo343[i] = Math.round(results[i].PLONo*100)/100;
            avgPloPercentage343[i] = Math.round(results[i].c*100)/100;
        }
        console.log(PLONo343)
        console.log(avgPloPercentage343)

        db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE460' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
            console.log(results)
            let PLONo460 = []
            let avgPloPercentage460 = []
            for (let i = 0; i < results.length; ++i) {
                PLONo460[i] = Math.round(results[i].PLONo * 100) / 100;
                avgPloPercentage460[i] = Math.round(results[i].c * 100) / 100;
            }
            res.render(`VCMyCourses`, {
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
                PLONo343:PLONo343,
                avgPloPercentage343:avgPloPercentage343,
                PLONo460:PLONo460,
                avgPloPercentage460:avgPloPercentage460
            })
        }) })
});
Router.get("/VCProgramReports", (req,res) => {
    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSC'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
        console.log(results)

        let CSCCGPA = results[0].CGPA;


        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CEN'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
            console.log(results)


            let CENCGPA = results[0].CGPA;


            db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
      (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4) CGPA
      FROM
(SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
FROM(
       SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID
       FROM Registration_T r,Enrollment_T e
       WHERE r.StudentID=e.StudentID
       AND e.ProgramID='B.SC. in CSE'
   ) stepOne,Registration_T R,Enrollment_T E
GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                console.log(results)
                let CSECGPA = results[0].CGPA;




    db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE309' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
        console.log(results)
        let students343 = []
        let achievedNOPLO343 =[]

        for(let i=0;i<results.length;++i){
            students343[i] = results[i].StudentID;
            achievedNOPLO343[i] = results[i].achievedNoPlo;
        }



        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE309' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
            console.log(results)
            let attempted343 = results[0].c

            db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
                console.log(results)
                let students460 = [];
                let achievedNOPLO460 = [];

                for(let i=0;i<results.length;++i){
                    students460[i] = results[i].StudentID;
                    achievedNOPLO460[i] = results[i].achievedNoPlo;
                }
                console.log(achievedNOPLO460)


                db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE303' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
                    console.log(results)
                    let attempted460 = results[0].c
    res.render(`VCProgramReports`, {
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
        students343:students343,
        achievedNOPLO343:achievedNOPLO343,
        attempted343:attempted343,
        students460:students460,
        achievedNOPLO460:achievedNOPLO460,
        attempted460:attempted460,
        CSECGPA: CSECGPA,
        CENCGPA: CENCGPA,
        CSCCGPA: CSCCGPA

    })
}) }) }) }) }) }) })
});
Router.get("/VCSchoolReports", (req,res) => {

    res.render(`VCSchoolReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/VCInstructorReports", (req,res) => {

    res.render(`VCInstructorReports`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});



Router.get("/facultyCourses", (req,res) => {

    db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE464' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
        console.log(results)
        let students464 = []
        let achievedNOPLO464 =[]

        for(let i=0;i<results.length;++i){
            students464[i] = results[i].StudentID;
            achievedNOPLO464[i] = results[i].achievedNoPlo;
        }



        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE464' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
            console.log(results)
            let attempted464 = results[0].c

    db.all("SELECT stepTwo.CourseID course,stepTwo.StudentID,COUNT(stepTwo.PLONo) achievedNoPlo FROM (SELECT stepOne.CourseID,stepOne.RegistrationID,stepOne.StudentID,stepOne.PLONo  ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) ploPercentage FROM (SELECT c.CourseID,e.RegistrationID,r.StudentID ,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved  ,p.PLONo  FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m,Registration_T r  WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID  GROUP BY e.RegistrationID,p.PLONo,c.CONo)stepOne GROUP BY stepOne.RegistrationID,stepOne.PLONo  HAVING (ploPercentage>=40)) stepTwo GROUP BY stepTwo.RegistrationID", async(error, results) => {
        console.log(results)
        let students303 = [];
        let achievedNOPLO303 = [];

        for(let i=0;i<results.length;++i){
            students303[i] = results[i].StudentID;
            achievedNOPLO303[i] = results[i].achievedNoPlo;
        }
        console.log(achievedNOPLO303)


        db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM (SELECT stepOne.PLONo FROM (SELECT c.CourseID,c.CONo,r.StudentID,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND m.PLOID=p.PLOID AND m.COID=c.COID  AND c.CourseID='CSE303' GROUP BY m.PLOID,r.StudentID,c.CONo )stepOne,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =stepOne.coNo AND pl.PLONo=stepOne.PLONo GROUP BY stepOne.PLONo) PLOCount", async(error, results) => {
        console.log(results)
            let attempted303 = results[0].c

            db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
                console.log(results)
                let PLONo303 = []
                let avgPloPercentage303 = []
                for(let i=0;i<results.length;++i){
                    PLONo303[i] = Math.round(results[i].PLONo*100)/100;
                    avgPloPercentage303[i] = Math.round(results[i].c*100)/100;
                }
                console.log(PLONo303)
                console.log(avgPloPercentage303)

    db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE464' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
        console.log(results)
         let PLONo464 = []
         let avgPloPercentage464 = []
        for(let i=0;i<results.length;++i){
          PLONo464[i] = Math.round(results[i].PLONo*100)/100;
            avgPloPercentage464[i] = Math.round(results[i].c*100)/100;
        }
        console.log(PLONo464)
        console.log(avgPloPercentage464)
        res.render(`facultyCourses`, {
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
            PLONo303:PLONo303,
            avgPloPercentage303:avgPloPercentage303,
            PLONo464:PLONo464,
            avgPloPercentage464:avgPloPercentage464,
            students464:students464,
            achievedNOPLO464:achievedNOPLO464,
            attempted464:attempted464,
            students303:students303,
            achievedNOPLO303:achievedNOPLO303,
            attempted303:attempted303


        })
    }) }) }) }) }) })
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
    db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE303' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
        console.log(results)
        let PLONo303 = []
        let avgPloPercentage303 = []
        for(let i=0;i<results.length;++i){
            PLONo303[i] = Math.round(results[i].PLONo*100)/100;
            avgPloPercentage303[i] = Math.round(results[i].c*100)/100;
        }
        console.log(PLONo303)
        console.log(avgPloPercentage303)

        db.all("SELECT stepOne.PLONo, SUM(stepOne.Total) T,SUM(stepOne.Achieved) A ,(SUM(stepOne.Achieved)/SUM(stepOne.Total)*100) c FROM (SELECT c.CourseID,e.RegistrationID,c.CONo,SUM(a.AllocatedMark) Total,SUM(e.AchievedMark) Achieved ,p.PLONo FROM Evaluation_T e, CO_T c,Assessment_T a,PLO_T p,Mapping_T  m  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND c.CourseID='CSE309' AND m.COID=c.COID AND m.PLOID=p.PLOID GROUP BY p.PLONo,c.CONo ,e.RegistrationID)stepOne GROUP BY stepOne.PLONo", async(error, results) => {
            console.log(results)
            let PLONo309 = []
            let avgPloPercentage309 = []
            for (let i = 0; i < results.length; ++i) {
                PLONo309[i] = Math.round(results[i].PLONo * 100) / 100;
                avgPloPercentage309[i] = Math.round(results[i].c * 100) / 100;
            }
            res.render(`headMyCourse`, {
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
                PLONo303:PLONo303,
                avgPloPercentage303:avgPloPercentage303,
                PLONo309:PLONo309,
                avgPloPercentage309:avgPloPercentage309,
            })
        }) })

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