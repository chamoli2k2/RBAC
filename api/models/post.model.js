import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        imageUrl: [
            {
                type: String,
            }
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        isApproved: {
            type: Boolean,
            default: false
        }
    }, 

    {    
        timestamps: true
    }
);


const Post = mongoose.model('Post', postSchema);
export default Post;