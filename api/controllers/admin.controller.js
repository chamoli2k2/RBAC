import Post from "../models/post.model.js";

// Show Post which are not approved
const showNotApprovedPost = async (req, res) => {
    try {
        // Get all the post
        const posts = await Post.find({ isApproved: false }).populate('user', 'username email');

        // Send response
        res.status(200).json({ posts });
    } 
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// Approve the post
const approvePost = async (req, res) => {
    try {
        // Destructuring the request body
        const postId = req.params.id;

        // Check if the post exists
        const post = await Post.findOne({ _id: postId });

        if(!post){
            return res.status(400).json({msg: 'Post not found'});
        }

        // Update the post isApproved
        post.isApproved = true;

        // Save the post
        await post.save();

        // Send response
        res.status(200).json({msg: 'Post approved'});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

// Delete the post
const deletePost = async (req, res) => {
    try {
        // Destructuring the request body
        const postId = req.params.id;

        // Check if the post exists
        const post = await Post.findOne({ _id: postId });

        if(!post){
            return res.status(400).json({msg: 'Post not found'});
        }

        // Delete the post
        await post.deleteOne({ _id: postId });

        // Send response
        res.status(200).json({msg: 'Post deleted'});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

export { showNotApprovedPost, approvePost, deletePost };