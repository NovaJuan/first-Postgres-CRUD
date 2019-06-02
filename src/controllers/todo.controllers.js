const {conn} = require('./db.connection');

async function addTodo(req,res){
    const {title,description} = req.body;
    try{
        await conn.query('INSERT INTO todos (title,description) VALUES ($1,$2)',[title,description]);
        return res.redirect('/');
    }catch(e){
        console.log(e);
        res.send('Something goes wrong');
    }
}

async function updateTodo(req,res){
    const {id} = req.params;
    const {title,description} = req.body;
    try {
        if(title == '' && description == ''){
            return res.redirect('/');
        }
        if(title == ''){
            await conn.query('UPDATE todos SET title=$2 WHERE id=$1',[id,title]);
            return res.redirect('/');
        }
        if(description == ''){
            await conn.query('UPDATE todos SET description=$2 WHERE id=$1',[id,description]);
            return res.redirect('/');
        }
        await conn.query('UPDATE todos SET title=$2,description=$3 WHERE id=$1',[id,title,description]);
        return res.redirect('/');
    } catch (e) {
        console.log(e);
        res.send('Something goes wrong');
    }
}

async function deleteTodo(req,res){
    try {
        const {id} = req.params;
        await conn.query('DELETE FROM todos WHERE id=$1',[id]);
        return res.redirect('/');
    } catch (e) {
        console.log(e);
        res.send('Something goes wrong');
    }
}

module.exports = {addTodo,updateTodo,deleteTodo};