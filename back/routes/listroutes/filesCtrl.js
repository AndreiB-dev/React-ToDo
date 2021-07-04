const db = require('../../db/index');

async function setAvatar(user_id, avatar) {
    try {
        let res = await db.query(`
        UPDATE todolist.users SET avatar = '${avatar}' 
        WHERE user_id = ${user_id}
        RETURNING user_id, name, avatar
        `);
        return res.rows[0];
    } catch (e) {
        return [];
    };
};

async function getDataToSave(user_id) {
    try {
        let res = await db.query(`
        SELECT list.task_id, list.task, list.status, users.name FROM todolist.list, todolist.users 
        WHERE list.user_id = ${user_id} AND users.user_id = ${user_id}
        `);
        return res.rows;
    } catch (e) {
        return false;
    };
};

module.exports = {
    setAvatar,
    getDataToSave
}