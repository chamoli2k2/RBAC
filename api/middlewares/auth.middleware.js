import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try{
        let token;
 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }


        if(!token){
            return res.status(401).json({msg: 'Not authorized to access this route'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch(err){
        return res.status(401).json({msg: 'Not authorized to access this route'});
    }
}

export default protect;