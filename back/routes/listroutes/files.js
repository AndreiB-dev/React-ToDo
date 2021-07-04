var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { verifyToken } = require('../../jwt/vetyfytoken');
const {
    setAvatar,
    getDataToSave   
} = require('./filesCtrl');
const multer  = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    };
};

const upload = multer({storage: storageConfig, fileFilter: fileFilter});

router.post('/avatarUpload', verifyToken, upload.single('file'), async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            let result = await setAvatar(req.body.user_id, req.file.filename);
            let filePath = path.join(__dirname, `../../../back/public/images/${req.body.avatar}`);
            fs.unlinkSync(filePath);
            res.json({
                result
            });
        };
    });
});

router.post('/writeList', verifyToken, async function(req, res, next) {
    jwt.verify(req.token, 'someSecretKey', async (err, authData) => {
        if (err) {

        } else {
            let userList = await getDataToSave(req.body.user_id);
            console.log(userList);
            let filePath = path.join(__dirname, `../../../back/public/${userList[0].name}.txt`);
            let userPath = `http://127.0.0.1:3001/${userList[0].name}.txt`;
            let now = new Date().toLocaleString();
            fs.appendFileSync(filePath, `\n \nИзменения в списке задач пользователя ${userList[0].name} на: ${now}\n`);
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].status === false) {
                  userList[i].status = 'активна'
                  fs.appendFileSync(filePath, `\nЗадача №${userList[i].task_id} - ${userList[i].task} : ${userList[i].status}`)
                } else {
                  userList[i].status = 'выполнена'
                  fs.appendFileSync(filePath, `\nЗадача №${userList[i].task_id} - ${userList[i].task} : ${userList[i].status}`)
                }
              };
            res.json({
                userPath
            });
        };
    });
});

module.exports = router;