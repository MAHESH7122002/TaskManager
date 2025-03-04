import { jwt } from 'jsonwebtoken';
import mongoose from 'mongoose';

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db COnnection Established")
    } catch(err){
        console.log("DB Error:",err)
    }
}
export default dbConnection;

export const createJWT = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "1d",
    });
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict", //Prevents CSRF attacks
        maxAge: 1* 24 * 60 * 60 * 1000 //1 Dayc

    })
}