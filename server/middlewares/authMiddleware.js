import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const protectRoute = async (req,res,next) => {
    try{
        let token = req.cookies.token;
        console.log(token);
        if(token){
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            const resp = await User.findById(decodedToken.userId)
            .select("isAdmin email");
            console.log(resp)
            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodedToken.userId,
            }
            next();
        } else {
            res.status(404).json({
                message:"Not authorized",status:false
            })
        }
    } catch(error){
        console.error(error)
        return res.status(401).json({
            status:false,
            message: "Not authorized. Try Login Again"
        })
    }
}

const isAdminRoute = (req,res,next) => {
    console.log(req.user,req.isAdmin);
    if(req.user && req.user.isAdmin){
        next();
    } else {
        return res.status(401).json({
            status:false,
            message: "Not authorized as admin. Try Login as admin."
        })
    }
}

export {isAdminRoute,protectRoute};