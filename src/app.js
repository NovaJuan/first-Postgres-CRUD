const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const {conn} = require('./controllers/db.connection');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/todo',require('./routes/todos.routes'));
app.get('/',async(req,res)=>{
    try {
        const response = await conn.query('SELECT * FROM todos ORDER BY id ASC');
        res.render('index',{data:response.rows});
    } catch (e) {
        console.log(e);
        res.send('Something goes wrong. Please, wait a moment.');
    }
});

module.exports = app;