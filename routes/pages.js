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

    res.render(`register`,{AdminID: User.AdminID,
        A_F_Name: User.A_F_Name,
        A_L_Name: User.A_L_Name,
        A_Gender: User.A_Gender,
        A_DateOfBirth: User.A_DateOfBirth,
        A_Email: User.A_Email,
        A_Phone: User.A_Phone,
        A_Address: User.A_Address,
        AdminProfile: User.AdminProfile})
});
Router.get("/login", (req,res) => {

    res.render(`login`)
});
Router.get("/users", (req,res) => {

    res.render(`users`)
});
Router.get("/headProgramReports", (req,res) => {
    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
        console.log("hello, the results: ")
        console.log(results)
        let PLONo = []
        let PLOpercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOpercentage[i]=results[i].PLOpercentage;

        }





        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                 FROM
                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                             p.PLONo
                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                      WHERE c.AssessmentID=a.AssessmentID
                        AND c.AssessmentID= e.AssessmentID
                        AND e.RegistrationID=r.RegistrationID
                        AND m.PLOID=p.PLOID
                        AND r.StudentID=en.StudentID
                        AND s.SectionID=a.SectionID
                        AND en.ProgramID='B.SC. in CSC'
                        AND s.Year =2021
                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                 WHERE M.COID=C.COID
                   AND M.PLOID=pl.PLOID
                   AND C.CONo =stepOne.coNo
                   AND pl.PLONo=stepOne.PLONo
                 GROUP BY stepOne.PLONo
                 HAVING (PloPercentage>=40)`, async(error, results) => {
            console.log(results)
            let CSCPLOPERCENTAGE
            let sum = 0
            for(let i=0; i<results.length;++i){
                sum = sum + results[i].PloPercentage
            }
            let avg

            CSCPLOPERCENTAGE = sum/results.length



            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                     FROM
                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                 p.PLONo
                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                          WHERE c.AssessmentID=a.AssessmentID
                            AND c.AssessmentID= e.AssessmentID
                            AND e.RegistrationID=r.RegistrationID
                            AND m.PLOID=p.PLOID
                            AND r.StudentID=en.StudentID
                            AND s.SectionID=a.SectionID
                            AND en.ProgramID='B.SC. in CSE'
                            AND s.Year =2021
                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                     WHERE M.COID=C.COID
                       AND M.PLOID=pl.PLOID
                       AND C.CONo =stepOne.coNo
                       AND pl.PLONo=stepOne.PLONo
                     GROUP BY stepOne.PLONo
                     HAVING (PloPercentage>=40)`, async(error, results) => {
                console.log(results)
                let CSEPLOPERCENTAGE
                let summ = 0
                for(let i=0; i<results.length;++i){
                    summ = summ + results[i].PloPercentage
                }


                CSEPLOPERCENTAGE = summ/results.length






                db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                         FROM
                             (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                     p.PLONo
                              FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                              WHERE c.AssessmentID=a.AssessmentID
                                AND c.AssessmentID= e.AssessmentID
                                AND e.RegistrationID=r.RegistrationID
                                AND m.PLOID=p.PLOID
                                AND r.StudentID=en.StudentID
                                AND s.SectionID=a.SectionID
                                AND en.ProgramID='B.SC. in CEN'
                                AND s.Year =2021
                              GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                         WHERE M.COID=C.COID
                           AND M.PLOID=pl.PLOID
                           AND C.CONo =stepOne.coNo
                           AND pl.PLONo=stepOne.PLONo
                         GROUP BY stepOne.PLONo
                         HAVING (PloPercentage>=40)`, async(error, results) => {
                    console.log(results)
                    let CENPLOPERCENTAGE
                    let sum3 = 0
                    for(let i=0; i<results.length;++i){
                        sum3 = sum3 + results[i].PloPercentage
                    }


                    CENPLOPERCENTAGE = sum3/results.length

                    let programAVG = (CENPLOPERCENTAGE + CENPLOPERCENTAGE + CENPLOPERCENTAGE)/3;



                    db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                             FROM
                                 (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                         p.PLONo
                                  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                  WHERE c.AssessmentID=a.AssessmentID
                                    AND c.AssessmentID= e.AssessmentID
                                    AND e.RegistrationID=r.RegistrationID
                                    AND m.PLOID=p.PLOID
                                    AND r.StudentID=en.StudentID
                                    AND s.SectionID=a.SectionID
                                    AND en.ProgramID='B.SC. in CSC'
                                    AND s.Year =2021
                                  GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                             WHERE M.COID=C.COID
                               AND M.PLOID=pl.PLOID
                               AND C.CONo =stepOne.coNo
                               AND pl.PLONo=stepOne.PLONo
                             GROUP BY stepOne.PLONo`, async(error, results) => {
                        console.log(results)

                        let CSCPLONO = []
                        let CSCPLOPERCENT = []
                        for(let i=0;i<results.length;++i)
                        {
                            CSCPLONO[i] = results[i].PLONo;
                            CSCPLOPERCENT[i] = results[i].PloPercentage;
                        }




                        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                 FROM
                                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                             p.PLONo
                                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                      WHERE c.AssessmentID=a.AssessmentID
                                        AND c.AssessmentID= e.AssessmentID
                                        AND e.RegistrationID=r.RegistrationID
                                        AND m.PLOID=p.PLOID
                                        AND r.StudentID=en.StudentID
                                        AND s.SectionID=a.SectionID
                                        AND en.ProgramID='B.SC. in CEN'
                                        AND s.Year =2021
                                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                 WHERE M.COID=C.COID
                                   AND M.PLOID=pl.PLOID
                                   AND C.CONo =stepOne.coNo
                                   AND pl.PLONo=stepOne.PLONo
                                 GROUP BY stepOne.PLONo`, async(error, results) => {
                            console.log(results)

                            let CENPLONO = []
                            let CENPLOPERCENT = []
                            for(let i=0;i<results.length;++i)
                            {
                                CENPLONO[i] = results[i].PLONo;
                                CENPLOPERCENT[i] = results[i].PloPercentage;
                            }


                            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                     FROM
                                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                                 p.PLONo
                                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                          WHERE c.AssessmentID=a.AssessmentID
                                            AND c.AssessmentID= e.AssessmentID
                                            AND e.RegistrationID=r.RegistrationID
                                            AND m.PLOID=p.PLOID
                                            AND r.StudentID=en.StudentID
                                            AND s.SectionID=a.SectionID
                                            AND en.ProgramID='B.SC. in CSE'
                                            AND s.Year =2021
                                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                     WHERE M.COID=C.COID
                                       AND M.PLOID=pl.PLOID
                                       AND C.CONo =stepOne.coNo
                                       AND pl.PLONo=stepOne.PLONo
                                     GROUP BY stepOne.PLONo`, async(error, results) => {
                                console.log(results)
                                let CSEPLONO = []
                                let CSEPLOPERCENT = []
                                for(let i=0;i<results.length;++i)
                                {
                                    CSEPLONO[i] = results[i].PLONo;
                                    CSEPLOPERCENT[i] = results[i].PloPercentage;
                                }

                                db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                               (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                        FROM
                                            (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                             FROM(
                                                     SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                     FROM Registration_T r,Enrollment_T e
                                                     WHERE r.StudentID=e.StudentID
                                                       AND e.ProgramID='B.SC. in CSC'
                                                 ) stepOne
                                             GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                    console.log(results)

                                    let CSCCGPA = results[0].CGPA;


                                    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                   (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                            FROM
                                                (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                 FROM(
                                                         SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                         FROM Registration_T r,Enrollment_T e
                                                         WHERE r.StudentID=e.StudentID
                                                           AND e.ProgramID='B.SC. in CEN'
                                                     ) stepOne
                                                 GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                        console.log(results)


                                        let CENCGPA = results[0].CGPA;


                                        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                       (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                                FROM
                                                    (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                     FROM(
                                                             SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                             FROM Registration_T r,Enrollment_T e
                                                             WHERE r.StudentID=e.StudentID
                                                               AND e.ProgramID='B.SC. in CSE'
                                                         ) stepOne
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
                                                                CSECGPA:CSECGPA,
                                                                CENCGPA:CENCGPA,
                                                                CSCCGPA:CSCCGPA,
                                                                CSCPLONO:CSCPLONO,
                                                                CSCPLOPERCENT:CSCPLOPERCENT,
                                                                CSEPLONO:CSEPLONO,
                                                                CSEPLOPERCENT:CSEPLOPERCENT,
                                                                CENPLONO:CENPLONO,
                                                                CENPLOPERCENT:CENPLOPERCENT,
                                                                CSCPLOPERCENTAGE:CSCPLOPERCENTAGE,
                                                                CSEPLOPERCENTAGE:CSEPLOPERCENTAGE,
                                                                CENPLOPERCENTAGE:CENPLOPERCENTAGE,
                                                                programAVG:programAVG,
                                                                PLONo:PLONo,
                                                                PLOpercentage:PLOpercentage


                                                            })
                                                        }) }) }) }) }) }) }) }) }) }) }) }) }) })
});
Router.get("/student", (req,res) => {

    db.all(`SELECT MAX(s.Year) AS currentyear,s.Semester currentSem
            FROM Section_T s,Registration_T r
            WHERE r.StudentID=100
              AND s.SectionID=r.SectionID`, async(error, results) => {
        console.log("hello, the results: ")
        console.log(results)
        let currentyear = results[0].currentyear
        let currentSem = results[0].currentSem




        db.all(`SELECT COUNT(s1.SectionID) noOfSem
                FROM
                    (SELECT s.SectionID,s.Year,s.Semester
                     FROM Section_T s,Registration_T r
                     WHERE r.StudentID=100
                       AND s.SectionID=r.SectionID
                     GROUP BY s.Semester,s.Year) s1`, async(error, results) => {
            console.log("hello, the results: ")
            console.log(results)
            let noOfSem = results[0].noOfSem



            db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {


                let PLONo = []
                let PLOpercentage = []
                for(let i=0;i<results.length;++i){
                    PLONo[i] = results[i].PLONo;
                    PLOpercentage[i]=results[i].PLOpercentage;

                }

                db.all("SELECT COUNT(CountOfAchieved.PLONo) AS c FROM(SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total , COResult.achievedMark achievedMark ,p.PLONo  FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r  WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND e.RegistrationID=r.RegistrationID AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl  WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo HAVING (PLOpercentage>=40)) CountOfAchieved", async(error, results) => {

                    let achievedPLO = results[0].c;


                    db.all("SELECT COUNT(PLOCount.PLONo) AS c FROM(SELECT PLOrawMarks.PLONo FROM (SELECT COResult.CourseID courseID,COResult.CONo coNo,p.PLONo FROM (SELECT c.CourseID,c.CONo FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOCount", async(error, results) => {

                        let attemptedPLO = results[0].c;

                        let successRate = (achievedPLO/attemptedPLO)*100;


                        db.all("SELECT minT.PLONo,MIN(minT.PLOpercentage),ploT.PLOName FROM (SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A  FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,   COResult.achievedMark achievedMark ,p.PLONo  FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,  ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID  AND e.RegistrationID=r.RegistrationID  AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID  AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo) minT, PLO_T ploT,Mapping_T mapT WHERE mapT.PLOID=ploT.PLOID AND ploT.PLONo=minT.PLONo", async(error, results) => {

                            let MinPloNo = results[0].PLONo;
                            let MinPloName = results[0].PLOName;


                            db.all("SELECT maxT.PLONo,Max(maxT.PLOpercentage),ploT.PLOName FROM(SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total , COResult.achievedMark achievedMark ,p.PLONo FROM  (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100  GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo) maxT, PLO_T ploT,Mapping_T mapT WHERE mapT.PLOID=ploT.PLOID AND ploT.PLONo=maxT.PLONo", async(error, results) => {

                                let MaxPloNo = results[0].PLONo;
                                let MaxPloName = results[0].PLOName;





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
                                        PLOpercentage:PLOpercentage,
                                        ScholarshipPercentage:User.ScholarshipPercentage,
                                        currentyear:currentyear,
                                        currentSem: currentSem,
                                        noOfSem: noOfSem

                                    })
                                }) }) }) }) }) }) }) })
});

Router.get("/Faculty", (req,res) => {

    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=4321
                   AND s.Year=2021
                   AND s.SectionID=r.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLONo = []
        let PLOPercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOPercentage[i]=Math.round(results[i].PloPercentage *100)/100;

        }
        console.log(PLOPercentage)



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
            res.render(`Faculty`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID, program: program, countStudents: countStudents, PLONo:PLONo,
                PLOPercentage:PLOPercentage})
        }) })
});
Router.get("/Admin", (req,res) => {


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


                res.render(`Admin`, {
                    AdminID: User.AdminID,
                    A_F_Name: User.A_F_Name,
                    A_L_Name: User.A_L_Name,
                    A_Gender: User.A_Gender,
                    A_DateOfBirth: User.A_DateOfBirth,
                    A_Email: User.A_Email,
                    A_Phone: User.A_Phone,
                    A_Address: User.A_Address,
                    AdminProfile: User.AdminProfile,
                    schoolcountStudents:schoolcountStudents,
                    school:school,
                    department:department,
                    DeptcountStudents:DeptcountStudents,
                    program:program,
                    progcountStudents:progcountStudents

                })
            }) }) })
});
Router.get("/Dean", (req,res) => {
    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=5678
                   AND s.Year=2021
                   AND s.SectionID=r.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLONo = []
        let PLOPercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOPercentage[i]=Math.round(results[i].PloPercentage *100)/100;

        }
        console.log(PLOPercentage)
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
                    progcountStudents: progcountStudents,
                    PLONo:PLONo,
                    PLOPercentage:PLOPercentage})
            })
        })})
});
Router.get("/Head", (req,res) => {
    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=1234
                   AND s.Year=2021
                   AND s.SectionID=r.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLONo = []
        let PLOPercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOPercentage[i]=Math.round(results[i].PloPercentage *100)/100;

        }
        console.log(PLOPercentage)




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
                    DeptcountStudents: DeptcountStudents,
                    PLONo:PLONo,
                    PLOPercentage:PLOPercentage})
            })
        })
    })
});
Router.get("/VC", (req,res) => {
    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=1011
                   AND s.Year=2021
                   AND s.SectionID=r.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLONo = []
        let PLOPercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOPercentage[i]=Math.round(results[i].PloPercentage *100)/100;

        }
        console.log(PLOPercentage)





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
                        DeptcountStudents: DeptcountStudents,
                        PLONo:PLONo,
                        PLOPercentage:PLOPercentage
                    })
                })
            })
        }) })

});
Router.get("/index", (req,res) => {

    res.render(`index`)
});
Router.get("/StudentCourses", (req,res) => {
    db.all(`SELECT s.CourseID
            FROM Registration_T r,Student_T st,Enrollment_T e,Section_T s
            WHERE st.StdentID=100
              AND st.StdentID=r.StudentID
              AND r.SectionID=s.SectionID
            GROUP BY s.CourseID`, async(error, results) => {
        console.log('Etai ki sheta?')
        let listCourses=[]
        for(let i=0;i<results.length;++i){
            listCourses[i]=results[i].CourseID
        }










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
                res.render(`StudentCourses`,{StdentID: User.StdentID, S_fname: User.S_fname, S_lName: User.S_lName, S_Gender:User.S_Gender, S_DateOfBirth:User.S_DateOfBirth, S_Email:User.S_Email, S_Phone:User.S_Phone,S_Address:User.S_Address, StudentProfile:User.StudentProfile, Major:User.Major, Minor:User.Minor, data: sem, count: countStudents, co1: co1, co2:co2, co3:co3, co4:co4, PLONo: PLONo,listCourses:listCourses })
            }) }) })

});
Router.get("/studentReports", (req,res) => {



    db.all(`SELECT stepOne.CourseID,stepOne.PLONo,(SUM(stepOne.total)/SUM(stepOne.achievedMark))*100 PloPercentage
            FROM
                (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,p.PLONo
                 FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,PLO_T p,Mapping_T m
                 WHERE c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND e.RegistrationID=r.RegistrationID
                   AND p.PLONo=m.PLOID
                   AND c.COID=m.COID
                   AND r.StudentID=100
                 GROUP BY c.CourseID ,p.PLONo,c.CONo) stepOne
            GROUP BY stepOne.CourseID,stepOne.PLONo`, async(error, results) => {
        console.log('Etai ki sheta?')
        console.log(results)
        let CSE101PLO = [], CSE104PLO = [], CSE203PLO= [], CSE204PLO= [], CSE211PLO= [], CSE213PLO= [], CSE214PLO= [], CSE303PLO= [], CSE309PLO= [],CSE343PLO = [], CSE450PLO= [], CSE460PLO= [], CSE464PLO= []
        let sumPLO1 = 0, sumPLO2= 0 ,sumPLO3= 0 ,sumPLO4= 0 ,sumPLO5= 0 ,sumPLO6= 0 ,sumPLO7= 0 ,sumPLO8= 0 ,sumPLO12= 0
        for(let i=0;i<results.length; ++i){
            if(results[i].PLONo == 1){
                sumPLO1 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 2){
                sumPLO2 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 3){
                sumPLO3 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 4){
                sumPLO4 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 5){
                sumPLO5 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 6){
                sumPLO6 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 7){
                sumPLO7 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 8){
                sumPLO8 = sumPLO1 + results[i].PloPercentage
            }else if(results[i].PLONo == 12){
                sumPLO12 = sumPLO1 + results[i].PloPercentage
            }
        }


        for(let i=0;i<results.length; ++i){

            if(results[i].CourseID == 'CSE101'){
                if(results[i].PLONo == 1){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                else  if(results[i].PLONo == 2){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                else  if(results[i].PLONo == 3){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                else if(results[i].PLONo == 4){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                else if(results[i].PLONo == 5){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                else if(results[i].PLONo == 6){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                else  if(results[i].PLONo == 7){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                else   if(results[i].PLONo == 8){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                else    if(results[i].PLONo == 12){
                    CSE101PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }


            } else if(results[i].CourseID == 'CSE104'){
                if(results[i].PLONo == 1){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                else  if(results[i].PLONo == 2){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                else if(results[i].PLONo == 3){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                else if(results[i].PLONo == 4){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                else if(results[i].PLONo == 5){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                else if(results[i].PLONo == 6){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                else  if(results[i].PLONo == 7){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                else if(results[i].PLONo == 8){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                else if(results[i].PLONo == 12){
                    CSE104PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE203'){
                if(results[i].PLONo == 1){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                else if(results[i].PLONo == 2){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                else  if(results[i].PLONo == 3){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                else  if(results[i].PLONo == 4){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                else  if(results[i].PLONo == 5){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                else  if(results[i].PLONo == 6){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                else  if(results[i].PLONo == 7){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                else  if(results[i].PLONo == 8){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                else  if(results[i].PLONo == 12){
                    CSE203PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE204'){
                if(results[i].PLONo == 1){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                else if(results[i].PLONo == 2){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                else  if(results[i].PLONo == 3){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                else  if(results[i].PLONo == 4){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                else   if(results[i].PLONo == 5){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                else  if(results[i].PLONo == 6){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                else if(results[i].PLONo == 7){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                else  if(results[i].PLONo == 8){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                else if(results[i].PLONo == 12){
                    CSE204PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE211'){
                if(results[i].PLONo == 1){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE211PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE213'){
                if(results[i].PLONo == 1){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE213PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE214'){
                if(results[i].PLONo == 1){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE214PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE303'){
                if(results[i].PLONo == 1){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE303PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE309'){
                if(results[i].PLONo == 1){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE309PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE343'){
                if(results[i].PLONo == 1){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 3){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 4){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 5){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 6){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 7){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 8){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }
                if(results[i].PLONo == 12){
                    CSE343PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100                }

            }else if(results[i].CourseID == 'CSE450'){
                if(results[i].PLONo == 1){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE450PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            }  else if(results[i].CourseID == 'CSE460'){
                if(results[i].PLONo == 1){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE460PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            } else if(results[i].CourseID == 'CSE464'){
                if(results[i].PLONo == 1){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO1)*100
                }
                if(results[i].PLONo == 2){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO2)*100
                }
                if(results[i].PLONo == 3){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO3)*100
                }
                if(results[i].PLONo == 4){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO4)*100
                }
                if(results[i].PLONo == 5){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO5)*100
                }
                if(results[i].PLONo == 6){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO6)*100
                }
                if(results[i].PLONo == 7){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO7)*100
                }
                if(results[i].PLONo == 8){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO8)*100
                }
                if(results[i].PLONo == 12){
                    CSE464PLO[i] = ((results[i].PloPercentage)/sumPLO12)*100
                }

            }

        }
        console.log("CSE101PLO")
        console.log(CSE101PLO)



        db.all(`SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A,
            (SUM(PLOrawMarks.achievedMark)/SUM(PLOrawMarks.total))*100 PLOpercentage
     FROM
          (SELECT c.CourseID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,p.PLONo
               FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r, Mapping_T m,PLO_T p
               WHERE c.AssessmentID=a.AssessmentID
                 AND c.AssessmentID= e.AssessmentID
                 AND e.RegistrationID=r.RegistrationID
                 AND m.PLOID=p.PLOID
                 AND r.StudentID=100
               GROUP BY m.PLOID,c.CONo,c.CourseID )PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl
     WHERE M.COID=C.COID
       AND M.PLOID=pl.PLOID
       AND C.CONo =PLOrawMarks.coNo
       AND pl.PLONo=PLOrawMarks.PLONo
     GROUP BY PLOrawMarks.PLONo`, async(error, results) => {
            console.log(results)
            let studPLOPercentage = [];
            for(let i=0;i<results.length;++i){
                studPLOPercentage[i] = results[i].PLOpercentage
            }
            console.log(studPLOPercentage)

            db.all(`SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A,
            (SUM(PLOrawMarks.achievedMark)/SUM(PLOrawMarks.total))*100 PLOpercentage
     FROM
          (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                      p.PLONo
               FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Enrollment_T en,
                    Program_T pr,Mapping_T m,PLO_T p
               WHERE c.AssessmentID=a.AssessmentID
                 AND c.AssessmentID= e.AssessmentID
                 AND e.RegistrationID=r.RegistrationID
                 AND r.StudentID=en.StudentID
                 AND en.ProgramID=pr.ProgramID
                 AND m.PLOID=p.PLOID
                 AND m.COID=c.COID
                 AND pr.DepartmentID='CSE'
               GROUP BY p.PLONo,c.CONo,r.StudentID,c.CourseID) PLOrawMarks,CO_T C,PLO_T pl
     WHERE  C.CONo =PLOrawMarks.coNo
       AND pl.PLONo=PLOrawMarks.PLONo
     GROUP BY PLOrawMarks.PLONo`, async(error, results) => {
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
                        studPLOPercentage:studPLOPercentage,
                        CSE101PLO:CSE101PLO,
                        CSE104PLO:CSE104PLO,
                        CSE203PLO:CSE203PLO,
                        CSE204PLO:CSE204PLO,
                        CSE211PLO:CSE211PLO,
                        CSE213PLO:CSE213PLO,
                        CSE214PLO:CSE214PLO,
                        CSE303PLO:CSE303PLO,
                        CSE309PLO:CSE309PLO,
                        CSE450PLO:CSE450PLO,
                        CSE460PLO:CSE460PLO,
                        CSE464PLO:CSE464PLO,
                        CSE343PLO:CSE343PLO
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
    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=5678
--        AND s.Year=2021
                   AND s.CourseID='CSE303'
                   AND s.SectionID=r.SectionID
                   AND s.SectionID=a.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLOPercentage5678 = []

        for (let i = 0; i < results.length; ++i) {

            PLOPercentage5678[i] = results[i].PloPercentage;
        }



        db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                FROM
                    (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                            SUM(e.AchievedMark) achievedMark,
                            p.PLONo
                     FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                          Mapping_T m,PLO_T p,Enrollment_T en
                     WHERE s.FacultyID=1234
--        AND s.Year=2021
                       AND s.CourseID='CSE303'
                       AND s.SectionID=r.SectionID
                       AND s.SectionID=a.SectionID
                       AND c.AssessmentID=a.AssessmentID
                       AND c.AssessmentID= e.AssessmentID
                       AND m.PLOID=p.PLOID
                       AND c.COID=m.COID
                       AND en.StudentID=r.StudentID
                     GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                GROUP BY stepOne.PLONo`, async(error, results) => {
            let PLOPercentage1234 = []

            for (let i = 0; i < results.length; ++i) {

                PLOPercentage1234[i] = results[i].PloPercentage;
            }




            db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                    FROM
                        (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                                SUM(e.AchievedMark) achievedMark,
                                p.PLONo
                         FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                              Mapping_T m,PLO_T p,Enrollment_T en
                         WHERE s.FacultyID=4321
--        AND s.Year=2021
                           AND s.CourseID='CSE303'
                           AND s.SectionID=r.SectionID
                           AND s.SectionID=a.SectionID
                           AND c.AssessmentID=a.AssessmentID
                           AND c.AssessmentID= e.AssessmentID
                           AND m.PLOID=p.PLOID
                           AND c.COID=m.COID
                           AND en.StudentID=r.StudentID
                         GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                    GROUP BY stepOne.PLONo`, async(error, results) => {
                let PLOPercentage4321 = []

                for (let i = 0; i < results.length; ++i) {

                    PLOPercentage4321[i] = results[i].PloPercentage;
                }
                console.log(PLOPercentage4321)
                console.log(PLOPercentage1234)
                console.log(PLOPercentage5678)
                res.render(`DeanSchoolReports`, {
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
                    PLOPercentage4321:PLOPercentage4321,
                    PLOPercentage5678:PLOPercentage5678,
                    PLOPercentage1234:PLOPercentage1234
                })
            }) }) })});
Router.get("/DeanDataEntry", (req,res) => {

    res.render(`DeanDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
});
Router.get("/DeanDepartmentReports", (req,res) => {
    db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
             FROM
                 (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                         p.PLONo
                  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s,
                       Program_T pr
                  WHERE c.AssessmentID=a.AssessmentID
                    AND c.AssessmentID= e.AssessmentID
                    AND e.RegistrationID=r.RegistrationID
                    AND m.PLOID=p.PLOID
                    AND r.StudentID=en.StudentID
                    AND s.SectionID=a.SectionID
                    AND en.ProgramID=pr.ProgramID
                    AND pr.DepartmentID='EEE'
                    AND s.Year =2021
                  GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
             WHERE M.COID=C.COID
               AND M.PLOID=pl.PLOID
               AND C.CONo =stepOne.coNo
               AND pl.PLONo=stepOne.PLONo
             GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let EEEPLOPERCENTAGE
        let summ = 0
        for(let i=0; i<results.length;++i){
            summ = summ + results[i].PloPercentage
        }


        EEEPLOPERCENTAGE = summ/results.length






        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                 FROM
                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                             p.PLONo
                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s,
                           Program_T pr
                      WHERE c.AssessmentID=a.AssessmentID
                        AND c.AssessmentID= e.AssessmentID
                        AND e.RegistrationID=r.RegistrationID
                        AND m.PLOID=p.PLOID
                        AND r.StudentID=en.StudentID
                        AND s.SectionID=a.SectionID
                        AND en.ProgramID=pr.ProgramID
                        AND pr.DepartmentID='CSE'
                        AND s.Year =2021
                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                 WHERE M.COID=C.COID
                   AND M.PLOID=pl.PLOID
                   AND C.CONo =stepOne.coNo
                   AND pl.PLONo=stepOne.PLONo
                 GROUP BY stepOne.PLONo`, async(error, results) => {
            console.log(results)
            let CSEPLOPERCENTAGE
            let sum3 = 0
            for(let i=0; i<results.length;++i){
                sum3 = sum3 + results[i].PloPercentage
            }


            CSEPLOPERCENTAGE = sum3/results.length

            let programAVG = (EEEPLOPERCENTAGE + CSEPLOPERCENTAGE)/2;


            db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                           ((SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4) AS CGPA
                    FROM
                        (SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                         FROM(
                                 SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,p.DepartmentID
                                 FROM Registration_T r,Enrollment_T e,Program_T p
                                 WHERE r.StudentID=e.StudentID
                                   AND e.ProgramID=p.ProgramID
                                   AND p.DepartmentID='CSE'
                             ) stepOne,Registration_T R,Enrollment_T E
                         GROUP BY stepOne.StudentID) stepTwo
            `, async(error, results) => {
                let CGPACSE = results[0].CGPA



                db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                               ((SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4) AS CGPA
                        FROM
                            (SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                             FROM(
                                     SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,p.DepartmentID
                                     FROM Registration_T r,Enrollment_T e,Program_T p
                                     WHERE r.StudentID=e.StudentID
                                       AND e.ProgramID=p.ProgramID
                                       AND p.DepartmentID='EEE'
                                 ) stepOne,Registration_T R,Enrollment_T E
                             GROUP BY stepOne.StudentID) stepTwo
                `, async(error, results) => {
                    let  CGPAEEE = results[0].CGPA





                    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                            FROM
                                (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                        p.PLONo
                                 FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en
                                    ,Section_T s,Program_T pr,Course_T course
                                 WHERE c.AssessmentID=a.AssessmentID
                                   AND c.AssessmentID= e.AssessmentID
                                   AND e.RegistrationID=r.RegistrationID
                                   AND m.PLOID=p.PLOID
                                   AND r.StudentID=en.StudentID
                                   AND s.SectionID=a.SectionID
                                   AND en.ProgramID=course.ProgramID
                                   AND course.ProgramID=pr.ProgramID
                                   AND pr.DepartmentID ='EEE'
                                   AND s.Year =2021
                                 GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                            WHERE M.COID=C.COID
                              AND M.PLOID=pl.PLOID
                              AND C.CONo =stepOne.coNo
                              AND pl.PLONo=stepOne.PLONo
                            GROUP BY stepOne.PLONo`, async(error, results) => {
                        let PLONoEEE = []
                        let PLOPercentageEEE = []

                        for (let i = 0; i < results.length; ++i) {
                            PLONoEEE[i] = results[i].PLONo;
                            PLOPercentageEEE[i] = results[i].PloPercentage;
                        }




                        db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                FROM
                                    (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                            p.PLONo
                                     FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en
                                        ,Section_T s,Program_T pr,Course_T course
                                     WHERE c.AssessmentID=a.AssessmentID
                                       AND c.AssessmentID= e.AssessmentID
                                       AND e.RegistrationID=r.RegistrationID
                                       AND m.PLOID=p.PLOID
                                       AND r.StudentID=en.StudentID
                                       AND s.SectionID=a.SectionID
                                       AND en.ProgramID=course.ProgramID
                                       AND course.ProgramID=pr.ProgramID
                                       AND pr.DepartmentID ='CSE'
                                       AND s.Year =2021
                                     GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                WHERE M.COID=C.COID
                                  AND M.PLOID=pl.PLOID
                                  AND C.CONo =stepOne.coNo
                                  AND pl.PLONo=stepOne.PLONo
                                GROUP BY stepOne.PLONo`, async(error, results) => {
                            let PLONoCSE = []
                            let PLOPercentageCSE = []

                            for (let i = 0; i < results.length; ++i) {
                                PLONoCSE[i] = results[i].PLONo;
                                PLOPercentageCSE[i] = results[i].PloPercentage;
                            }



                            res.render(`DeanDepartmentReports`, {
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
                                PLONoCSE: PLONoCSE,
                                PLONoEEE:PLONoEEE,
                                PLOPercentageCSE:PLOPercentageCSE,
                                PLOPercentageEEE:PLOPercentageEEE,
                                CGPACSE:CGPACSE,
                                CGPAEEE: CGPAEEE,
                                programAVG:programAVG,
                                CSEPLOPERCENTAGE:CSEPLOPERCENTAGE,
                                EEEPLOPERCENTAGE:EEEPLOPERCENTAGE
                            })
                        }) }) }) }) }) })

});
Router.get("/VCDepartmentReports", (req,res) => {


    db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
             FROM
                 (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                         p.PLONo
                  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s,
                       Program_T pr
                  WHERE c.AssessmentID=a.AssessmentID
                    AND c.AssessmentID= e.AssessmentID
                    AND e.RegistrationID=r.RegistrationID
                    AND m.PLOID=p.PLOID
                    AND r.StudentID=en.StudentID
                    AND s.SectionID=a.SectionID
                    AND en.ProgramID=pr.ProgramID
                    AND pr.DepartmentID='EEE'
                    AND s.Year =2021
                  GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
             WHERE M.COID=C.COID
               AND M.PLOID=pl.PLOID
               AND C.CONo =stepOne.coNo
               AND pl.PLONo=stepOne.PLONo
             GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let EEEPLOPERCENTAGE
        let summ = 0
        for(let i=0; i<results.length;++i){
            summ = summ + results[i].PloPercentage
        }


        EEEPLOPERCENTAGE = summ/results.length






        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                 FROM
                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                             p.PLONo
                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s,
                           Program_T pr
                      WHERE c.AssessmentID=a.AssessmentID
                        AND c.AssessmentID= e.AssessmentID
                        AND e.RegistrationID=r.RegistrationID
                        AND m.PLOID=p.PLOID
                        AND r.StudentID=en.StudentID
                        AND s.SectionID=a.SectionID
                        AND en.ProgramID=pr.ProgramID
                        AND pr.DepartmentID='CSE'
                        AND s.Year =2021
                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                 WHERE M.COID=C.COID
                   AND M.PLOID=pl.PLOID
                   AND C.CONo =stepOne.coNo
                   AND pl.PLONo=stepOne.PLONo
                 GROUP BY stepOne.PLONo`, async(error, results) => {
            console.log(results)
            let CSEPLOPERCENTAGE
            let sum3 = 0
            for(let i=0; i<results.length;++i){
                sum3 = sum3 + results[i].PloPercentage
            }


            CSEPLOPERCENTAGE = sum3/results.length

            let programAVG = (EEEPLOPERCENTAGE + CSEPLOPERCENTAGE)/2;


            db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                           ((SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4) AS CGPA
                    FROM
                        (SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                         FROM(
                                 SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,p.DepartmentID
                                 FROM Registration_T r,Enrollment_T e,Program_T p
                                 WHERE r.StudentID=e.StudentID
                                   AND e.ProgramID=p.ProgramID
                                   AND p.DepartmentID='CSE'
                             ) stepOne,Registration_T R,Enrollment_T E
                         GROUP BY stepOne.StudentID) stepTwo
            `, async(error, results) => {
                let CGPACSE = results[0].CGPA



                db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                               ((SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4) AS CGPA
                        FROM
                            (SELECT SUM(stepOne.calOne)/SUM(R.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                             FROM(
                                     SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,p.DepartmentID
                                     FROM Registration_T r,Enrollment_T e,Program_T p
                                     WHERE r.StudentID=e.StudentID
                                       AND e.ProgramID=p.ProgramID
                                       AND p.DepartmentID='EEE'
                                 ) stepOne,Registration_T R,Enrollment_T E
                             GROUP BY stepOne.StudentID) stepTwo
                `, async(error, results) => {
                    let  CGPAEEE = results[0].CGPA





                    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                            FROM
                                (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                        p.PLONo
                                 FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en
                                    ,Section_T s,Program_T pr,Course_T course
                                 WHERE c.AssessmentID=a.AssessmentID
                                   AND c.AssessmentID= e.AssessmentID
                                   AND e.RegistrationID=r.RegistrationID
                                   AND m.PLOID=p.PLOID
                                   AND r.StudentID=en.StudentID
                                   AND s.SectionID=a.SectionID
                                   AND en.ProgramID=course.ProgramID
                                   AND course.ProgramID=pr.ProgramID
                                   AND pr.DepartmentID ='EEE'
                                   AND s.Year =2021
                                 GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                            WHERE M.COID=C.COID
                              AND M.PLOID=pl.PLOID
                              AND C.CONo =stepOne.coNo
                              AND pl.PLONo=stepOne.PLONo
                            GROUP BY stepOne.PLONo`, async(error, results) => {
                        let PLONoEEE = []
                        let PLOPercentageEEE = []

                        for (let i = 0; i < results.length; ++i) {
                            PLONoEEE[i] = results[i].PLONo;
                            PLOPercentageEEE[i] = results[i].PloPercentage;
                        }




                        db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                FROM
                                    (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                            p.PLONo
                                     FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en
                                        ,Section_T s,Program_T pr,Course_T course
                                     WHERE c.AssessmentID=a.AssessmentID
                                       AND c.AssessmentID= e.AssessmentID
                                       AND e.RegistrationID=r.RegistrationID
                                       AND m.PLOID=p.PLOID
                                       AND r.StudentID=en.StudentID
                                       AND s.SectionID=a.SectionID
                                       AND en.ProgramID=course.ProgramID
                                       AND course.ProgramID=pr.ProgramID
                                       AND pr.DepartmentID ='CSE'
                                       AND s.Year =2021
                                     GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                WHERE M.COID=C.COID
                                  AND M.PLOID=pl.PLOID
                                  AND C.CONo =stepOne.coNo
                                  AND pl.PLONo=stepOne.PLONo
                                GROUP BY stepOne.PLONo`, async(error, results) => {
                            let PLONoCSE = []
                            let PLOPercentageCSE = []

                            for (let i = 0; i < results.length; ++i) {
                                PLONoCSE[i] = results[i].PLONo;
                                PLOPercentageCSE[i] = results[i].PloPercentage;
                            }



                            res.render(`VCDepartmentReports`, {
                                FacultyID: User.FacultyID,
                                F_fname: User.F_fname,
                                F_lName: User.F_lName,
                                F_Gender: User.F_Gender,
                                F_DateOfBirth: User.F_DateOfBirth,
                                F_Email: User.F_Email,
                                F_Phone: User.F_Phone,
                                F_Address: User.F_Address,
                                FacultyProfile: User.FacultyProfile,
                                PLONoCSE: PLONoCSE,
                                PLONoEEE:PLONoEEE,
                                PLOPercentageCSE:PLOPercentageCSE,
                                PLOPercentageEEE:PLOPercentageEEE,
                                CGPACSE:CGPACSE,
                                CGPAEEE: CGPAEEE,
                                programAVG:programAVG,
                                CSEPLOPERCENTAGE:CSEPLOPERCENTAGE,
                                EEEPLOPERCENTAGE:EEEPLOPERCENTAGE,
                                DepartmentID: User.DepartmentID,
                            })
                        }) }) }) }) }) })
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

    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
        console.log("hello, the results: ")
        console.log(results)
        let PLONo = []
        let PLOpercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOpercentage[i]=results[i].PLOpercentage;

        }




        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                 FROM
                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                             p.PLONo
                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                      WHERE c.AssessmentID=a.AssessmentID
                        AND c.AssessmentID= e.AssessmentID
                        AND e.RegistrationID=r.RegistrationID
                        AND m.PLOID=p.PLOID
                        AND r.StudentID=en.StudentID
                        AND s.SectionID=a.SectionID
                        AND en.ProgramID='B.SC. in CSC'
                        AND s.Year =2021
                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                 WHERE M.COID=C.COID
                   AND M.PLOID=pl.PLOID
                   AND C.CONo =stepOne.coNo
                   AND pl.PLONo=stepOne.PLONo
                 GROUP BY stepOne.PLONo
                 HAVING (PloPercentage>=40)`, async(error, results) => {
            console.log(results)
            let CSCPLOPERCENTAGE
            let sum = 0
            for(let i=0; i<results.length;++i){
                sum = sum + results[i].PloPercentage
            }
            let avg

            CSCPLOPERCENTAGE = sum/results.length



            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                     FROM
                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                 p.PLONo
                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                          WHERE c.AssessmentID=a.AssessmentID
                            AND c.AssessmentID= e.AssessmentID
                            AND e.RegistrationID=r.RegistrationID
                            AND m.PLOID=p.PLOID
                            AND r.StudentID=en.StudentID
                            AND s.SectionID=a.SectionID
                            AND en.ProgramID='B.SC. in CSE'
                            AND s.Year =2021
                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                     WHERE M.COID=C.COID
                       AND M.PLOID=pl.PLOID
                       AND C.CONo =stepOne.coNo
                       AND pl.PLONo=stepOne.PLONo
                     GROUP BY stepOne.PLONo
                     HAVING (PloPercentage>=40)`, async(error, results) => {
                console.log(results)
                let CSEPLOPERCENTAGE
                let summ = 0
                for(let i=0; i<results.length;++i){
                    summ = summ + results[i].PloPercentage
                }


                CSEPLOPERCENTAGE = summ/results.length






                db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                         FROM
                             (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                     p.PLONo
                              FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                              WHERE c.AssessmentID=a.AssessmentID
                                AND c.AssessmentID= e.AssessmentID
                                AND e.RegistrationID=r.RegistrationID
                                AND m.PLOID=p.PLOID
                                AND r.StudentID=en.StudentID
                                AND s.SectionID=a.SectionID
                                AND en.ProgramID='B.SC. in CEN'
                                AND s.Year =2021
                              GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                         WHERE M.COID=C.COID
                           AND M.PLOID=pl.PLOID
                           AND C.CONo =stepOne.coNo
                           AND pl.PLONo=stepOne.PLONo
                         GROUP BY stepOne.PLONo
                         HAVING (PloPercentage>=40)`, async(error, results) => {
                    console.log(results)
                    let CENPLOPERCENTAGE
                    let sum3 = 0
                    for(let i=0; i<results.length;++i){
                        sum3 = sum3 + results[i].PloPercentage
                    }


                    CENPLOPERCENTAGE = sum3/results.length

                    let programAVG = (CENPLOPERCENTAGE + CENPLOPERCENTAGE + CENPLOPERCENTAGE)/3;




                    db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                             FROM
                                 (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                         p.PLONo
                                  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                  WHERE c.AssessmentID=a.AssessmentID
                                    AND c.AssessmentID= e.AssessmentID
                                    AND e.RegistrationID=r.RegistrationID
                                    AND m.PLOID=p.PLOID
                                    AND r.StudentID=en.StudentID
                                    AND s.SectionID=a.SectionID
                                    AND en.ProgramID='B.SC. in CSC'
                                    AND s.Year =2021
                                  GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                             WHERE M.COID=C.COID
                               AND M.PLOID=pl.PLOID
                               AND C.CONo =stepOne.coNo
                               AND pl.PLONo=stepOne.PLONo
                             GROUP BY stepOne.PLONo`, async(error, results) => {
                        console.log(results)

                        let CSCPLONO = []
                        let CSCPLOPERCENT = []
                        for(let i=0;i<results.length;++i)
                        {
                            CSCPLONO[i] = results[i].PLONo;
                            CSCPLOPERCENT[i] = results[i].PloPercentage;
                        }




                        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                 FROM
                                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                             p.PLONo
                                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                      WHERE c.AssessmentID=a.AssessmentID
                                        AND c.AssessmentID= e.AssessmentID
                                        AND e.RegistrationID=r.RegistrationID
                                        AND m.PLOID=p.PLOID
                                        AND r.StudentID=en.StudentID
                                        AND s.SectionID=a.SectionID
                                        AND en.ProgramID='B.SC. in CEN'
                                        AND s.Year =2021
                                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                 WHERE M.COID=C.COID
                                   AND M.PLOID=pl.PLOID
                                   AND C.CONo =stepOne.coNo
                                   AND pl.PLONo=stepOne.PLONo
                                 GROUP BY stepOne.PLONo`, async(error, results) => {
                            console.log(results)

                            let CENPLONO = []
                            let CENPLOPERCENT = []
                            for(let i=0;i<results.length;++i)
                            {
                                CENPLONO[i] = results[i].PLONo;
                                CENPLOPERCENT[i] = results[i].PloPercentage;
                            }


                            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                     FROM
                                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                                 p.PLONo
                                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                          WHERE c.AssessmentID=a.AssessmentID
                                            AND c.AssessmentID= e.AssessmentID
                                            AND e.RegistrationID=r.RegistrationID
                                            AND m.PLOID=p.PLOID
                                            AND r.StudentID=en.StudentID
                                            AND s.SectionID=a.SectionID
                                            AND en.ProgramID='B.SC. in CSE'
                                            AND s.Year =2021
                                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                     WHERE M.COID=C.COID
                                       AND M.PLOID=pl.PLOID
                                       AND C.CONo =stepOne.coNo
                                       AND pl.PLONo=stepOne.PLONo
                                     GROUP BY stepOne.PLONo`, async(error, results) => {
                                console.log(results)
                                let CSEPLONO = []
                                let CSEPLOPERCENT = []
                                for(let i=0;i<results.length;++i)
                                {
                                    CSEPLONO[i] = results[i].PLONo;
                                    CSEPLOPERCENT[i] = results[i].PloPercentage;
                                }

                                db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                               (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                        FROM
                                            (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                             FROM(
                                                     SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                     FROM Registration_T r,Enrollment_T e
                                                     WHERE r.StudentID=e.StudentID
                                                       AND e.ProgramID='B.SC. in CSC'
                                                 ) stepOne
                                             GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                    console.log(results)

                                    let CSCCGPA = results[0].CGPA;


                                    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                   (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                            FROM
                                                (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                 FROM(
                                                         SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                         FROM Registration_T r,Enrollment_T e
                                                         WHERE r.StudentID=e.StudentID
                                                           AND e.ProgramID='B.SC. in CEN'
                                                     ) stepOne
                                                 GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                        console.log(results)


                                        let CENCGPA = results[0].CGPA;


                                        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                       (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                                FROM
                                                    (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                     FROM(
                                                             SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                             FROM Registration_T r,Enrollment_T e
                                                             WHERE r.StudentID=e.StudentID
                                                               AND e.ProgramID='B.SC. in CSE'
                                                         ) stepOne
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
                                                                CSCCGPA: CSCCGPA,
                                                                CSCPLONO:CSCPLONO,
                                                                CSCPLOPERCENT:CSCPLOPERCENT,
                                                                CSEPLONO:CSEPLONO,
                                                                CSEPLOPERCENT:CSEPLOPERCENT,
                                                                CENPLONO:CENPLONO,
                                                                CENPLOPERCENT:CENPLOPERCENT,
                                                                CSCPLOPERCENTAGE:CSCPLOPERCENTAGE,
                                                                CSEPLOPERCENTAGE:CSEPLOPERCENTAGE,
                                                                CENPLOPERCENTAGE:CENPLOPERCENTAGE,
                                                                programAVG:programAVG,
                                                                PLONo:PLONo,
                                                                PLOpercentage:PLOpercentage,


                                                            })
                                                        }) }) }) }) }) }) }) }) }) }) }) }) }) })
});
Router.get("/VCDataEntry", (req,res) => {

    res.render(`VCDataEntry`, {FacultyID: User.FacultyID,  F_fname: User.F_fname, F_lName:User.F_lName, F_Gender:User.F_Gender, F_DateOfBirth:User.F_DateOfBirth, F_Email:User.F_Email, F_Phone:User.F_Phone,F_Address:User.F_Address, FacultyProfile:User.FacultyProfile, DepartmentID:User.DepartmentID})
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
    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
        console.log("hello, the results: ")
        console.log(results)
        let PLONo = []
        let PLOpercentage = []
        for(let i=0;i<results.length;++i){
            PLONo[i] = results[i].PLONo;
            PLOpercentage[i]=results[i].PLOpercentage;

        }






        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                 FROM
                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                             p.PLONo
                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                      WHERE c.AssessmentID=a.AssessmentID
                        AND c.AssessmentID= e.AssessmentID
                        AND e.RegistrationID=r.RegistrationID
                        AND m.PLOID=p.PLOID
                        AND r.StudentID=en.StudentID
                        AND s.SectionID=a.SectionID
                        AND en.ProgramID='B.SC. in CSC'
                        AND s.Year =2021
                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                 WHERE M.COID=C.COID
                   AND M.PLOID=pl.PLOID
                   AND C.CONo =stepOne.coNo
                   AND pl.PLONo=stepOne.PLONo
                 GROUP BY stepOne.PLONo
                 HAVING (PloPercentage>=40)`, async(error, results) => {
            console.log(results)
            let CSCPLOPERCENTAGE
            let sum = 0
            for(let i=0; i<results.length;++i){
                sum = sum + results[i].PloPercentage
            }
            let avg

            CSCPLOPERCENTAGE = sum/results.length



            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                     FROM
                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                 p.PLONo
                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                          WHERE c.AssessmentID=a.AssessmentID
                            AND c.AssessmentID= e.AssessmentID
                            AND e.RegistrationID=r.RegistrationID
                            AND m.PLOID=p.PLOID
                            AND r.StudentID=en.StudentID
                            AND s.SectionID=a.SectionID
                            AND en.ProgramID='B.SC. in CSE'
                            AND s.Year =2021
                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                     WHERE M.COID=C.COID
                       AND M.PLOID=pl.PLOID
                       AND C.CONo =stepOne.coNo
                       AND pl.PLONo=stepOne.PLONo
                     GROUP BY stepOne.PLONo
                     HAVING (PloPercentage>=40)`, async(error, results) => {
                console.log(results)
                let CSEPLOPERCENTAGE
                let summ = 0
                for(let i=0; i<results.length;++i){
                    summ = summ + results[i].PloPercentage
                }


                CSEPLOPERCENTAGE = summ/results.length






                db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                         FROM
                             (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                     p.PLONo
                              FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                              WHERE c.AssessmentID=a.AssessmentID
                                AND c.AssessmentID= e.AssessmentID
                                AND e.RegistrationID=r.RegistrationID
                                AND m.PLOID=p.PLOID
                                AND r.StudentID=en.StudentID
                                AND s.SectionID=a.SectionID
                                AND en.ProgramID='B.SC. in CEN'
                                AND s.Year =2021
                              GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                         WHERE M.COID=C.COID
                           AND M.PLOID=pl.PLOID
                           AND C.CONo =stepOne.coNo
                           AND pl.PLONo=stepOne.PLONo
                         GROUP BY stepOne.PLONo
                         HAVING (PloPercentage>=40)`, async(error, results) => {
                    console.log(results)
                    let CENPLOPERCENTAGE
                    let sum3 = 0
                    for(let i=0; i<results.length;++i){
                        sum3 = sum3 + results[i].PloPercentage
                    }


                    CENPLOPERCENTAGE = sum3/results.length

                    let programAVG = (CENPLOPERCENTAGE + CENPLOPERCENTAGE + CENPLOPERCENTAGE)/3;



                    db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                             FROM
                                 (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                         p.PLONo
                                  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                  WHERE c.AssessmentID=a.AssessmentID
                                    AND c.AssessmentID= e.AssessmentID
                                    AND e.RegistrationID=r.RegistrationID
                                    AND m.PLOID=p.PLOID
                                    AND r.StudentID=en.StudentID
                                    AND s.SectionID=a.SectionID
                                    AND en.ProgramID='B.SC. in CSC'
                                    AND s.Year =2021
                                  GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                             WHERE M.COID=C.COID
                               AND M.PLOID=pl.PLOID
                               AND C.CONo =stepOne.coNo
                               AND pl.PLONo=stepOne.PLONo
                             GROUP BY stepOne.PLONo`, async(error, results) => {
                        console.log(results)

                        let CSCPLONO = []
                        let CSCPLOPERCENT = []
                        for(let i=0;i<results.length;++i)
                        {
                            CSCPLONO[i] = results[i].PLONo;
                            CSCPLOPERCENT[i] = results[i].PloPercentage;
                        }




                        db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                 FROM
                                     (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                             p.PLONo
                                      FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                      WHERE c.AssessmentID=a.AssessmentID
                                        AND c.AssessmentID= e.AssessmentID
                                        AND e.RegistrationID=r.RegistrationID
                                        AND m.PLOID=p.PLOID
                                        AND r.StudentID=en.StudentID
                                        AND s.SectionID=a.SectionID
                                        AND en.ProgramID='B.SC. in CEN'
                                        AND s.Year =2021
                                      GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                 WHERE M.COID=C.COID
                                   AND M.PLOID=pl.PLOID
                                   AND C.CONo =stepOne.coNo
                                   AND pl.PLONo=stepOne.PLONo
                                 GROUP BY stepOne.PLONo`, async(error, results) => {
                            console.log(results)

                            let CENPLONO = []
                            let CENPLOPERCENT = []
                            for(let i=0;i<results.length;++i)
                            {
                                CENPLONO[i] = results[i].PLONo;
                                CENPLOPERCENT[i] = results[i].PloPercentage;
                            }


                            db.all(` SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                                     FROM
                                         (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                                                 p.PLONo
                                          FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Mapping_T m,PLO_T p,Enrollment_T en,Section_T s
                                          WHERE c.AssessmentID=a.AssessmentID
                                            AND c.AssessmentID= e.AssessmentID
                                            AND e.RegistrationID=r.RegistrationID
                                            AND m.PLOID=p.PLOID
                                            AND r.StudentID=en.StudentID
                                            AND s.SectionID=a.SectionID
                                            AND en.ProgramID='B.SC. in CSE'
                                            AND s.Year =2021
                                          GROUP BY m.PLOID,c.CONo,c.CourseID,r.StudentID) stepOne,CO_T C,Mapping_T M,PLO_T pl
                                     WHERE M.COID=C.COID
                                       AND M.PLOID=pl.PLOID
                                       AND C.CONo =stepOne.coNo
                                       AND pl.PLONo=stepOne.PLONo
                                     GROUP BY stepOne.PLONo`, async(error, results) => {
                                console.log(results)
                                let CSEPLONO = []
                                let CSEPLOPERCENT = []
                                for(let i=0;i<results.length;++i)
                                {
                                    CSEPLONO[i] = results[i].PLONo;
                                    CSEPLOPERCENT[i] = results[i].PloPercentage;
                                }



                                db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                               (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                        FROM
                                            (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                             FROM(
                                                     SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                     FROM Registration_T r,Enrollment_T e
                                                     WHERE r.StudentID=e.StudentID
                                                       AND e.ProgramID='B.SC. in CSC'
                                                 ) stepOne
                                             GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                    console.log(results)

                                    let CSCCGPA = results[0].CGPA;


                                    db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                   (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                            FROM
                                                (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                 FROM(
                                                         SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                         FROM Registration_T r,Enrollment_T e
                                                         WHERE r.StudentID=e.StudentID
                                                           AND e.ProgramID='B.SC. in CEN'
                                                     ) stepOne
                                                 GROUP BY stepOne.StudentID) stepTwo`, async(error, results) => {
                                        console.log(results)


                                        let CENCGPA = results[0].CGPA;


                                        db.all(`SELECT SUM(stepTwo.CGPAofCSE) sumofCGPA, COUNT(stepTwo.StudentID) noofStudent,
                                                       (SUM(stepTwo.CGPAofCSE)/COUNT(stepTwo.StudentID)*4)/4 CGPA
                                                FROM
                                                    (SELECT SUM(stepOne.calOne)/SUM(stepOne.AchievedCredit) CGPAofCSE, stepOne.StudentID ,stepOne.ProgramID
                                                     FROM(
                                                             SELECT (r.GradePoint*r.AchievedCredit) calOne ,r.StudentID,e.ProgramID,r.AchievedCredit
                                                             FROM Registration_T r,Enrollment_T e
                                                             WHERE r.StudentID=e.StudentID
                                                               AND e.ProgramID='B.SC. in CSE'
                                                         ) stepOne
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
                                                                CSCCGPA: CSCCGPA,
                                                                CSCPLONO:CSCPLONO,
                                                                CSCPLOPERCENT:CSCPLOPERCENT,
                                                                CSEPLONO:CSEPLONO,
                                                                CSEPLOPERCENT:CSEPLOPERCENT,
                                                                CENPLONO:CENPLONO,
                                                                CENPLOPERCENT:CENPLOPERCENT,
                                                                CSCPLOPERCENTAGE:CSCPLOPERCENTAGE,
                                                                CSEPLOPERCENTAGE:CSEPLOPERCENTAGE,
                                                                CENPLOPERCENTAGE:CENPLOPERCENTAGE,
                                                                programAVG:programAVG,
                                                                PLONo:PLONo,
                                                                PLOpercentage:PLOpercentage


                                                            })
                                                        }) }) }) }) }) }) }) }) }) }) }) }) }) })
});
Router.get("/VCSchoolReports", (req,res) => {
    db.all(`SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A,
                   (SUM(PLOrawMarks.achievedMark)/SUM(PLOrawMarks.total))*100 PLOpercentage
            FROM
                (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Enrollment_T en,
                      Program_T pr,Mapping_T m,PLO_T p,Department_T d
                 WHERE c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND e.RegistrationID=r.RegistrationID
                   AND r.StudentID=en.StudentID
                   AND en.ProgramID=pr.ProgramID
                   AND m.PLOID=p.PLOID
                   AND m.COID=c.COID
                   AND pr.DepartmentID=d.DepartmentID
                   AND d.SchoolID='SETS'
                 GROUP BY p.PLONo,c.CONo,r.StudentID,c.CourseID) PLOrawMarks,CO_T C,PLO_T pl
            WHERE  C.CONo =PLOrawMarks.coNo
              AND pl.PLONo=PLOrawMarks.PLONo
            GROUP BY PLOrawMarks.PLONo`, async(error, results) => {
        console.log(results)
        let PLOPercentageSETS = []

        for (let i = 0; i < results.length; ++i) {

            PLOPercentageSETS[i] = results[i].PLOpercentage;
        }

        db.all(`SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A,
                       (SUM(PLOrawMarks.achievedMark)/SUM(PLOrawMarks.total))*100 PLOpercentage
                FROM
                    (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark,
                            p.PLONo
                     FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r,Enrollment_T en,
                          Program_T pr,Mapping_T m,PLO_T p,Department_T d
                     WHERE c.AssessmentID=a.AssessmentID
                       AND c.AssessmentID= e.AssessmentID
                       AND e.RegistrationID=r.RegistrationID
                       AND r.StudentID=en.StudentID
                       AND en.ProgramID=pr.ProgramID
                       AND m.PLOID=p.PLOID
                       AND m.COID=c.COID
                       AND pr.DepartmentID=d.DepartmentID
                       AND d.SchoolID='SB'
                     GROUP BY p.PLONo,c.CONo,r.StudentID,c.CourseID) PLOrawMarks,CO_T C,PLO_T pl
                WHERE  C.CONo =PLOrawMarks.coNo
                  AND pl.PLONo=PLOrawMarks.PLONo
                GROUP BY PLOrawMarks.PLONo`, async(error, results) => {
            console.log(results)
            let PLOPercentageSB = []

            for (let i = 0; i < results.length; ++i) {

                PLOPercentageSB[i] = results[i].PLOpercentage;
            }


            res.render(`VCSchoolReports`, {
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
                PLOPercentageSB:PLOPercentageSB,
                PLOPercentageSETS:PLOPercentageSETS
            })
        })  })

});
Router.get("/VCInstructorReports", (req,res) => {

    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=5678
--        AND s.Year=2021
                   AND s.CourseID='CSE303'
                   AND s.SectionID=r.SectionID
                   AND s.SectionID=a.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLOPercentage5678 = []

        for (let i = 0; i < results.length; ++i) {

            PLOPercentage5678[i] = results[i].PloPercentage;
        }



        db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                FROM
                    (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                            SUM(e.AchievedMark) achievedMark,
                            p.PLONo
                     FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                          Mapping_T m,PLO_T p,Enrollment_T en
                     WHERE s.FacultyID=1234
--        AND s.Year=2021
                       AND s.CourseID='CSE303'
                       AND s.SectionID=r.SectionID
                       AND s.SectionID=a.SectionID
                       AND c.AssessmentID=a.AssessmentID
                       AND c.AssessmentID= e.AssessmentID
                       AND m.PLOID=p.PLOID
                       AND c.COID=m.COID
                       AND en.StudentID=r.StudentID
                     GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                GROUP BY stepOne.PLONo`, async(error, results) => {
            let PLOPercentage1234 = []

            for (let i = 0; i < results.length; ++i) {

                PLOPercentage1234[i] = results[i].PloPercentage;
            }




            db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                    FROM
                        (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                                SUM(e.AchievedMark) achievedMark,
                                p.PLONo
                         FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                              Mapping_T m,PLO_T p,Enrollment_T en
                         WHERE s.FacultyID=4321
--        AND s.Year=2021
                           AND s.CourseID='CSE303'
                           AND s.SectionID=r.SectionID
                           AND s.SectionID=a.SectionID
                           AND c.AssessmentID=a.AssessmentID
                           AND c.AssessmentID= e.AssessmentID
                           AND m.PLOID=p.PLOID
                           AND c.COID=m.COID
                           AND en.StudentID=r.StudentID
                         GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                    GROUP BY stepOne.PLONo`, async(error, results) => {
                let PLOPercentage4321 = []

                for (let i = 0; i < results.length; ++i) {

                    PLOPercentage4321[i] = results[i].PloPercentage;
                }

                res.render(`VCInstructorReports`, {
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
                    PLOPercentage4321:PLOPercentage4321,
                    PLOPercentage5678:PLOPercentage5678,
                    PLOPercentage1234:PLOPercentage1234
                })
            }) }) })
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

    db.all("SELECT PLOWiseRawMarks.PLONo,((PLOWiseRawMarks.A/PLOWiseRawMarks.T)*100) PLOpercentage FROM (SELECT PLOrawMarks.PLONo,SUM(PLOrawMarks.total) T,SUM(PLOrawMarks.achievedMark) A FROM  (SELECT COResult.CourseID courseID,COResult.StudentID stuID,COResult.CONo coNo,COResult.total total ,  COResult.achievedMark achievedMark ,p.PLONo  FROM (SELECT c.CourseID,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,SUM(e.AchievedMark) achievedMark, ((SUM(e.AchievedMark)/SUM(a.AllocatedMark))*100) CoPercentage  FROM Evaluation_T e, CO_T c,Assessment_T a,Registration_T r WHERE c.AssessmentID=a.AssessmentID  AND c.AssessmentID= e.AssessmentID AND e.RegistrationID=r.RegistrationID AND r.StudentID=100 GROUP BY c.CourseID ,c.CONo) COResult, Mapping_T m,PLO_T p  WHERE m.PLOID=p.PLOID  GROUP BY m.PLOID,COResult.CONo,COResult.CourseID) PLOrawMarks,CO_T C,Mapping_T M,PLO_T pl WHERE M.COID=C.COID AND M.PLOID=pl.PLOID  AND C.CONo =PLOrawMarks.coNo AND pl.PLONo=PLOrawMarks.PLONo GROUP BY PLOrawMarks.PLONo) PLOWiseRawMarks GROUP BY PLOWiseRawMarks.PLONo", async(error, results) => {
        console.log("hello, the results: ")
        console.log(results)
        let PLONo = []
        let PLOpercentage = []
        for (let i = 0; i < results.length; ++i) {
            PLONo[i] = results[i].PLONo;
            PLOpercentage[i] = results[i].PLOpercentage;

        }

        db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSE' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSE'", async (error, results) => {
            console.log(results)
            let CSEAvgCgpa = results[0].a;
            console.log(CSEAvgCgpa)
            db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CEN' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CEN'", async (error, results) => {
                console.log(results)
                let CENAvgCgpa = results[0].a;

                console.log(CENAvgCgpa)
                db.all("SELECT E.ProgramID,AVG(CGPAofAllStudent.CGPA) AS a FROM (SELECT SUM(r.GradePoint*r.AchievedCredit) x,SUM(r.AchievedCredit) CreditEarned, (SUM(r.GradePoint*r.AchievedCredit)/SUM(r.AchievedCredit)) CGPA , r.StudentID,e.ProgramID FROM Registration_T r,Enrollment_T e WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSC' GROUP BY r.StudentID) CGPAofAllStudent,Registration_T R,Enrollment_T E WHERE r.StudentID=e.StudentID AND e.ProgramID='B.SC. in CSC'", async (error, results) => {
                    console.log(results)
                    let CSCAvgCgpa = results[0].a;

                    console.log(CSCAvgCgpa)
                    res.render(`facultyStudentReport`, {
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
                        CSCAvgCgpa: CSCAvgCgpa,
                        CENAvgCgpa: CENAvgCgpa,
                        CSEAvgCgpa: CSEAvgCgpa,
                        PLONo:PLONo,
                        PLOpercentage:PLOpercentage,
                    })
                })
            })
        }) })

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
    db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
            FROM
                (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                        SUM(e.AchievedMark) achievedMark,
                        p.PLONo
                 FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                      Mapping_T m,PLO_T p,Enrollment_T en
                 WHERE s.FacultyID=5678
--        AND s.Year=2021
                   AND s.CourseID='CSE303'
                   AND s.SectionID=r.SectionID
                   AND s.SectionID=a.SectionID
                   AND c.AssessmentID=a.AssessmentID
                   AND c.AssessmentID= e.AssessmentID
                   AND m.PLOID=p.PLOID
                   AND c.COID=m.COID
                   AND en.StudentID=r.StudentID
                 GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
            GROUP BY stepOne.PLONo`, async(error, results) => {
        console.log(results)
        let PLOPercentage5678 = []

        for (let i = 0; i < results.length; ++i) {

            PLOPercentage5678[i] = results[i].PloPercentage;
        }



        db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                FROM
                    (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                            SUM(e.AchievedMark) achievedMark,
                            p.PLONo
                     FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                          Mapping_T m,PLO_T p,Enrollment_T en
                     WHERE s.FacultyID=1234
--        AND s.Year=2021
                       AND s.CourseID='CSE303'
                       AND s.SectionID=r.SectionID
                       AND s.SectionID=a.SectionID
                       AND c.AssessmentID=a.AssessmentID
                       AND c.AssessmentID= e.AssessmentID
                       AND m.PLOID=p.PLOID
                       AND c.COID=m.COID
                       AND en.StudentID=r.StudentID
                     GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                GROUP BY stepOne.PLONo`, async(error, results) => {
            let PLOPercentage1234 = []

            for (let i = 0; i < results.length; ++i) {

                PLOPercentage1234[i] = results[i].PloPercentage;
            }




            db.all(`SELECT stepOne.PLONo,(SUM(stepOne.achievedMark)/SUM(stepOne.total)*100) PloPercentage
                    FROM
                        (SELECT s.FacultyID,s.CourseID,s.Year,r.StudentID,c.CONo,SUM(a.AllocatedMark) total ,
                                SUM(e.AchievedMark) achievedMark,
                                p.PLONo
                         FROM Section_T s,Registration_T r,Evaluation_T e, CO_T c,Assessment_T a,
                              Mapping_T m,PLO_T p,Enrollment_T en
                         WHERE s.FacultyID=4321
--        AND s.Year=2021
                           AND s.CourseID='CSE303'
                           AND s.SectionID=r.SectionID
                           AND s.SectionID=a.SectionID
                           AND c.AssessmentID=a.AssessmentID
                           AND c.AssessmentID= e.AssessmentID
                           AND m.PLOID=p.PLOID
                           AND c.COID=m.COID
                           AND en.StudentID=r.StudentID
                         GROUP BY m.PLOID,c.CONo,r.StudentID)  stepOne
                    GROUP BY stepOne.PLONo`, async(error, results) => {
                let PLOPercentage4321 = []

                for (let i = 0; i < results.length; ++i) {

                    PLOPercentage4321[i] = results[i].PloPercentage;
                }

                res.render(`headInstructorReport`, {
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
                    PLOPercentage4321:PLOPercentage4321,
                    PLOPercentage5678:PLOPercentage5678,
                    PLOPercentage1234:PLOPercentage1234
                })
            }) }) })});
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

Router.get("/headevaluation2", (req,res) => {

    res.render(`headevaluation2`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});
Router.get("/headevaluation3", (req,res) => {

    res.render(`headevaluation3`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/headassesment2", (req,res) => {

    res.render(`headassesment2`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/headassesment1", (req,res) => {

    res.render(`headassesment1`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});


// /DEAN
Router.get("/deanevaluation", (req,res) => {

    res.render(`deanevaluation`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/deaneva1", (req,res) => {

    res.render(`deaneva1`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/deaneva2", (req,res) => {

    res.render(`deaneva2`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/deangrade", (req,res) => {

    res.render(`deangrade`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/deangrad1", (req,res) => {

    res.render(`deangrad1`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});

Router.get("/deangrad2", (req,res) => {

    res.render(`deangrad2`, {AdminID:User.AdminID, A_F_Name:User.A_F_Name, A_L_Name:User.A_L_Name, A_Gender:User.A_Gender, A_DateOfBirth:User.A_DateOfBirth, A_Email:User.A_Email, A_Phone:User.A_Phone,A_Address:User.A_Address, AdminProfile:User.AdminProfile})
});





module.exports = Router;