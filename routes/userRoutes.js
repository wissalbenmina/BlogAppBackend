const express = require('express');
const router = express.Router();
const Users = require('../controllers/userController');

router.use(express.json())

router.get('/getUsers', Users.getAllUsers);
router.get('/getUser/:id', Users.getUser);
router.post('/createUser', Users.createUser);
router.post('/login', Users.login);
router.put('/updateUser/:id', Users.updateUser);
router.delete('/deleteUser/:id', Users.deleteUser);

module.exports = router