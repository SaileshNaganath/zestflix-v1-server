import jwt from 'jsonwebtoken';

const generateToken = (user) =>{
    return jwt.sign(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            isClient:user.isClient
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'30d'
        }
    )
}

export default generateToken;