const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// get all users
async function getAllUsers(req, res){
    try {
        const currentUser = req.user; 

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const users = await User.find({})

        if(!users || users.length === 0){
            return res.status(404).json({message: 'There are no Users'})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// get user by id
async function getUser(req, res){
    try {
        const currentUser = req.user; 

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        console.log("user", currentUser)
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOne({_id: id});

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// create user
async function createUser(req, res){
    try {
        const {name, password, email, role} = req.body;
        const user = new User({
            name, 
            password,
            email,
            role
        });

        await user.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "User not exist" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Password incorrect" });
        }
        const token = jwt.sign({userId: user._id, email: email }, "Secret123", { expiresIn: "1h" });

        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update user
async function updateUser(req, res){
    try {
        const id = req.params.id;
        const filter = {_id: id};
        const update = req.body;
        const currentUser = req.user;

        if (currentUser.role !== 'Admin' && currentUser._id.toString() !== id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const user = await User.findOneAndUpdate(filter, update)

        if(!user){
            res.status(404).json({message: 'User not found'}) 
        }

        res.json({message: 'User updated successfully', user})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete user
async function deleteUser(req, res){
    try {
        const id = req.params.id;

        const currentUser = req.user;

        if (currentUser.role !== 'Admin' && currentUser._id.toString() !== id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const user = await User.findOneAndDelete({_id: id})

        if(!user){
            res.status(404).json({message: 'User not found'}) 
        }

        res.json({message: 'User deleted successfully', user})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
}