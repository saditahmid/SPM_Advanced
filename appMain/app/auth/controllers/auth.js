const sqlite3 = require("sqlite3").verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let db = new sqlite3.Database('E:/Spring 2021 course work/SPM_Advanced/appMain/base/DataSource/database.sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
exports.login = async(req, res) =>{
    try{
        console.log(req.body);
        const userId = req.body.userId;
        const password = req.body.password;
      if(!userId || !password){
          return res.status(400).render('login',{
              message: 'Please provide an ID or password'
          })
      }
        db.serialize(function(){

            db.get("SELECT User_ID,User_Password from Users WHERE User_ID = ?",[userId], async(error, results) => {

                console.log(results)
                if(!(results) || !(await bcrypt.compare(password, results.User_Password)))
                {res.status(401).render('login',{
                    message: 'ID or Password is incorrect'
                });}
                else{
                    res.status(200).redirect("/users");
                }






            })






        })
    }catch (error) {
      console.log(error)
    }

}

exports.register = (req, res) =>{
    console.log(req.body);
    const Email = req.body.Email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    console.log(Email);
    db.serialize(function() {
        db.run("SELECT User_ID from Users WHERE User_ID = ?", [Email], async (error, results) => {
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

            let run = db.run('INSERT INTO Users(User_ID, User_Password) VALUES(?,?)', [Email, hashedPassword]
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
        })

    })
}
