const db = require('../../db/');

async function logIn(name, pass) {
    try {
        let res = await db.query(`
        SELECT user_id, name, avatar FROM todolist.users WHERE name = '${name}' AND password = '${pass}'
        `);
        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return false;
        }
    } catch (e) {
        return [];
    };
};


async function regUser(name, pass) {
    try {
        let res = await db.query(`
        INSERT INTO todolist.users (name, password) VALUES ('${name}', '${pass}')
        RETURNING user_id, name
        `);
        return res.rows[0];
    } catch (e) {
        return [];
    };
};

async function getTasks(user_id) {
    try {
        let res = await db.query(`
        SELECT * FROM todolist.list WHERE user_id = '${user_id}' ORDER BY task_id
        `);
        return res.rows;
    } catch (e) {
        return false; 
    };
};

async function addTask(task, user_id) {
    try {
        let res = await db.query(`
        INSERT INTO todolist.list (task, status, user_id) VALUES ('${task}', 'false', '${user_id}')
        `);
        return true;
    } catch (e) {
        return false;
    };
};

async function changeStatus(task_id, status, user_id) {
    try {
        await db.query(`
        UPDATE todolist.list SET status = '${status}' 
        WHERE task_id = ${task_id} AND user_id = ${user_id}
        `);
    } catch (e) {
        return false;
    };
};

async function deleteTask(task_id) {
    try {
        let res = await db.query(`
        DELETE FROM todolist.list WHERE task_id = ${task_id}
        RETURNING user_id
        `);
        return res.rows[0].user_id;
    } catch (e) {
        return false;
    };
};

async function editTask(task_id, task) {
    try {
        let res = await db.query(`
        UPDATE todolist.list SET task = '${task}' WHERE task_id = ${task_id}
        RETURNING user_id
        `);
        return res.rows[0].user_id
    } catch (e) {
        return false;
    };
};

async function searchTask(text, user_id) {
    try {
        let res = await db.query(`
        SELECT * FROM todolist.list WHERE task ILIKE '%${text}%' AND user_id = ${user_id}
        `);
        return res.rows;
    } catch (e) {
        return [];
    };
};

module.exports = {
    logIn,
    regUser,
    getTasks,
    addTask,
    changeStatus,
    deleteTask,
    editTask,
    searchTask
}