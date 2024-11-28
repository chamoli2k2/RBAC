import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import uploadImageToCloudinary from '../utils/uploadImageToCloudinary.js';

// Create a new post
const createPost = async (req, res) => {
    try {
        // Destructuring the request body
        const { title, content } = req.body;

        // If admin and owner is creating post then auto approved the post
        const user = await User.findOne({ _id: req.user.id });

        const isApproved = user.role === 'Admin' || user.role === 'Owner' ? true : false;

        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const imageUrl = await Promise.all(
            req.files.map(async (file) => await uploadImageToCloudinary(file))
        );

        // Create a new post
        const post = await Post.create({
            title,
            content,
            imageUrl,
            user: req.user.id,
            isApproved,
        });

        // Send response
        res.status(201).json({ post });
    } 
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


// Get all posts which are approved
const getApprovedPosts = async (req, res) => {
    try {
        // Get all posts which are approved
        const posts = await Post.find({ isApproved: true }).populate('user', 'username email');

        // Send response
        res.status(200).json({ posts });
    } 
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


// Delete a post
const deletePost = async (req, res) => {
    try {
        // Destructuring the request body
        const postId = req.params.id;

        // Check if the post exists
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Delete the post
        await Post.deleteOne({ _id: postId });

        // Send response
        res.status(200).json({ msg: 'Post deleted' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        // Destructuring the request body
        const postId = req.params.id;
        const { title, content } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const newImageUrl = await Promise.all(
            req.files.map(async (file) => await uploadImageToCloudinary(file))
        );

        // Check if the post exists
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update the post
        post.title = title;
        post.content = content;
        post.imageUrl = newImageUrl;

        // Save the post
        await post.save();

        // Send response
        res.status(200).json({ msg: 'Post updated' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


export { createPost, getApprovedPosts, deletePost, updatePost };