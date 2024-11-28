import User from '../models/user.model.js';

const isOwner = async (req, res, next) => {
    try{

        // Finding the owner
        const user = await User.findOne({ _id: req.user.id });

        if(!user){
            return res.status(404).json({msg: 'user not found'});
        }

        if(user.role !== 'Owner'){
            return res.status(403).json({msg: 'Not authorized as an owner'});
        }

        next();
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
};


export default isOwner;