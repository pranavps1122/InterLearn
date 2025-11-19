import { Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id:string,
    role:"user"|"reviewer"|"admin"
}

export const protect = (req:Request,res:Response,next:NextFunction)=>{
    let token;

    if(req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.status(401).json({message:"Not authorized,no token"})
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload

        req.user= {
            id:decoded.id,
            role:decoded.role,
        }

        return next()
    } catch (error) {
        console.log('error finded in jwt token',error)
        return res.status(401).json({message:"Token invalid or expired"})  
    }
}