import { generateAccessToken } from "../utils/generateTokens.js";
import User from "../models/user.model.js";
import Post from '../models/post.model.js';

// route: api/users/register
const register = async (req, res) => {
    try {
        // Destructuring the request body
        const { username, email, password } = req.body;

        // Check if the user exists
        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({msg: 'User already exists'});
        }

        // Create a new user
        const user = await User.create({
            username,
            email,
            password,
        });

        // Send response
        res.status(201).json({ user });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


// route: api/users/login
const login = async (req, res) => {
    try {
        // Destructuring the request body
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        // Send response
        res.status(200).json({ token: generateAccessToken(user._id), role: user.role, _id: user._id });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// get user profile
const getUserProfile = async (req, res) => {
    try {
        // Destructuring the request body
        const userId = req.user.id;

        // Check if the user exists
        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        // Send response
        res.status(200).json({ user });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// update a user
const update = async (req, res) => {
    try {

        // Destructuring the request body
        const userId = req.params.id;
        

        // Check if the user exists
        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        // Update the user
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: req.body }, { new: true });

        // Send response
        res.status(200).json({ updatedUser });

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

const getPostByUser = async (req, res) => {
    try {
        // Destructuring the request body
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        // Get all posts by the user
        const posts = await Post.find({ user: userId });

        // Send response
        res.status(200).json({ posts });

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

const getunApprovedPosts = async(req, res) => {
    try{
        const userId = req.user.id;

        const user = await User.findOne({ _id: userId });   

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }   


        // Get all posts by the user which are not approved
        const post = await Post.find({ user: userId, isApproved: false });

        // Send response
        res.status(200).json({ post });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


export { register, login, update, getPostByUser, getUserProfile, getunApprovedPosts };