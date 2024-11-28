import User from '../models/user.model.js';
import Post from '../models/post.model.js';

// Temporary route for owner registration
const ownerRegister = async (req, res) => {
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
            role: 'Owner'
        });

        // Send response
        res.status(201).json({ user });
    } 
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// Toggle Aproval
const toggleApproval = async (req, res) => {
    try{
        // Destructuring the request body
        const postId = req.params.id;

        // Check if the post exists
        const post = await Post.findOne({ _id: postId });
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }

        // Toggle the approval
        if(post.isApproved){
            post.isApproved = false;
        }
        else{
            post.isApproved = true;
        }

        // Save the post
        await post.save();

        // Send response
        res.status(200).json({ msg: 'Post approval toggled' });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// Permote to the admin role
const promote = async (req, res) => {
    try {
        // Destructuring the request body
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        //  Checking
        if(user.role === 'Admin' || user.role === 'Owner'){
            return res.status(400).json({msg: 'User is already an Admin or Owner'});
        }

        // Update the user role
        user.role = 'Admin';

        // Save the user
        await user.save();

        // Send response
        res.status(200).json({msg: 'User promoted to Admin'});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// Delete post
const deletePost = async (req, res) => {
    try{
        // Destructuring the request body
        const postId = req.params.id;

        // Check if the post exists
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }

        // Delete the post
        await Post.deleteOne({ _id: postId });

        // Send response
        res.status(200).json({msg: 'Post deleted'});

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }   
};

// Find all the post
const allPost = async (req, res) => {
    try{
        // Get all the post
        const posts = await Post.find();

        // Send response
        res.status(200).json({ posts });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


// Demote to the user role
const demote = async (req, res) => {
    try {
        // Destructuring the request body
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findOne({ _id: userId});

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        //  Checking
        if(user.role === 'User' || user.role === 'Owner'){
            return res.status(400).json({msg: 'User is already a User or Owner'});
        }

        // Update the user role
        user.role = 'User';

        // Save the user
        await user.save();

        // Send response
        res.status(200).json({msg: 'User demoted to User'});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// show all the users
const showAllUser = async (req, res) => {
    try {
        // Fetch all the users
        const users = await User.find();

        // Send response
        res.status(200).json({ users });
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// show a user
const showUser = async (req, res) => {
    try {
        // Destructuring the request body
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findOne({ _id: userId});

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

export { ownerRegister, promote, demote, showAllUser, showUser, deletePost, allPost, toggleApproval };