const {Pool} = require('pg');

const conn = new Pool({
    user:'test',
    password:'.',
    database:'test',
    host:'localhost',
    port:5432,
    max:5,
    idleTimeoutMillis:10000,
    connectionTimeoutMillis:30000
});


if(conn){
    console.log('Database connected');
}

module.exports = {conn};