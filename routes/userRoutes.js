const express = require('express');
const router = express.Router();
const Users = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.use(express.json())

// router.use(auth);

router.get('/getUsers', auth, Users.getAllUsers);
router.get('/getUser/:id', auth, Users.getUser);
router.post('/createUser', Users.createUser);
router.post('/login', Users.login);
router.put('/updateUser/:id', auth, Users.updateUser);
router.delete('/deleteUser/:id', auth, Users.deleteUser);

module.exports = router