import { Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { ROLE } from "../constants/roles";
import { HttpError } from "../errors";

interface JwtPayload {
    id:string,
    role:ROLE
}


export const authorize =
  (roles: ROLE[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw HttpError.Forbidden("Access denied");
    }
    next();
  };

export const protect = (req:Request,res:Response,next:NextFunction)=>{
    let token;

    if(req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw HttpError.Unauthorized('Not authorized token')
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload

        req.user= {
            id:decoded.id,
            role:decoded.role,
        }

        return next()
    } catch (error) {
       throw HttpError.Unauthorized('Token expired or invalid token')
    }
}