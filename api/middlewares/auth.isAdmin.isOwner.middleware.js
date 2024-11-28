import User from "../models/user.model.js";

const isAdmin_isOwner = async(req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }


        // Check if the user is an admin or owner
        if (user.role === 'Admin' || user.role === 'Owner') {
            return next();
        }

        return res.status(403).json({ msg: 'Unauthorized' });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export default isAdmin_isOwner;