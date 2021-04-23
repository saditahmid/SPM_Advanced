const express= require('express');

const app = express()

app.set('view-engine', 'ejs')
app.use(express.static("public"));
app.use('/css',express.static (__dirname+'public/css'));
app.get('/', (req, res) => {
        res.render('index.ejs')
    }
)
app.listen(3000)






