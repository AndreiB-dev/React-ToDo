const db = require('./db');


async function createDB () {
    try {
        let res = await db.query(`
        CREATE SCHEMA todolist;
        CREATE TABLE todolist.users
        (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            password VARCHAR(20)
        );
        CREATE TABLE todolist.list
        (
            task_id SERIAL,
            task VARCHAR,
            status BOOLEAN,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES todolist.users (user_id)
        );
        `);
        
        return res;

    } catch (err) {
        console.log(err)
    }
}

createDB();