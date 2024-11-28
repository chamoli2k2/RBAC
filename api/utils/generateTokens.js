import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '40m'
    });
}

export { generateAccessToken };