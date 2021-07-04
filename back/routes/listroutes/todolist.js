var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../jwt/vetyfytoken');

const {
    logIn,
    regUser,
    addTask,
    getTasks,
    changeStatus,
    deleteTask,
    editTask,
    searchTask    
} = require('./helper');



router.post('/logIn', async function (req, res, next) {
    let userData = await logIn(req.body.name, req.body.pass);
        jwt.sign({ userData }, 'someSecretKey', { expiresIn: '10m' }, (err, token) => {
        res.json({
            token: token, userData
        });
    });
});

router.post('/Registration', async function (req, res, next) {
    let userData = await regUser(req.body.name, req.body.pass);
        jwt.sign({ userData }, 'someSecretKey', { expiresIn: '10m' }, (err, token) => {
        res.json({
            token: token, userData
        });
    });
});

router.post('/logOut', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', (err, token) => {
        let result = false;
        res.json({
            result
        });
    });
});

router.post('/checkUser', verifyToken, async function(req,res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {
            let result = false;
            res.json({
                result
            })
        } else {
            let result = authData;
            res.json({
                result
            });
        };
    });
})

router.post('/addTask', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            console.log(req.body);
            await addTask(req.body.task, req.body.user_id);
            let result = await getTasks(req.body.user_id);
            res.json({
                result
            });
        };
    });
});

router.post('/getTasks', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            let result = await getTasks(req.body.user_id);
            res.json({
                result
            });
        };
    });
});

router.post('/changeStatus', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            await changeStatus(req.body.task_id, req.body.status, req.body.user_id)
            let result = await getTasks(req.body.user_id);
            res.json({
                result
            });
        };
    });
});

router.post('/deleteTask', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            
            let user = await deleteTask(req.body.task_id)
            let result = await getTasks(user);
            console.log(req.body);
            res.json({
                result
            });
        };
    });
});

router.post('/editTask', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            let user = await editTask(req.body.task_id, req.body.task)
            let result = await getTasks(user);
            res.json({
                result
            });
        };
    });
});

router.post('/searchTask', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            let result =await searchTask(req.body.text, req.body.user_id)
            res.json({
                result
            });
        };
    });
});

module.exports = router;