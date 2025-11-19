import jwt from "jsonwebtoken";

export default function generateToken (id:string,role:string){
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET as string,
        {expiresIn:"7d"}
    )
}