import Post from "../models/post.model.js";

// Show all the post
const showAllPost = async (req, res) => {
    try {
        // Get all the post which are approved
        const posts = await Post.find({ isApproved: true }).populate('user', 'username email');

        // Send response
        res.status(200).json({ posts });
    } 
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};

export { showAllPost };