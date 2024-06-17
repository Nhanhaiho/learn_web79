import { JWT } from "../utils/getJsonWebToken.js";
import jwt from 'jsonwebtoken'
const verifyToken = async (req, res, next) => {

    try {
        const accessToken = req.headers.authorization;
        const token = accessToken.split(" ")[1];

        if (!token) {
            throw new Error('unauthorization')
        }
        const isVerify = jwt.verify(token, process.env.SECRET_KEY)
        if (isVerify) {
            next();
        } else {
            res.status(403)
            throw new Error('access token is invalid')
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
    
   
}

export default verifyToken