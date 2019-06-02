const {Router} = require('express');
const router = Router();

const {conn} = require('../controllers/db.connection');
const {addTodo,updateTodo,deleteTodo} = require('../controllers/todo.controllers');

router.route('/add')
    .get((req,res)=>{
        res.render('add');
    })
    .post(addTodo)

router.route('/update/:id')
    .get(async(req,res)=>{
        try {
            const {id} = req.params;
            const results = await conn.query('SELECT * FROM todos WHERE id=$1',[id]);
            const {title,description} = results.rows[0];
            return res.render('update',{id,oldTodo:{title,description}});
        } catch (e) {
            console.log(e);
            return res.send('Something goes wrong');
        }
    })
    .post(updateTodo)

router.route('/delete/:id')
    .get(deleteTodo)

module.exports = router;