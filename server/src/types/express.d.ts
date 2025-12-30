import { ROLE } from "@/core/constants/roles";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request{
            user?:{
                id:string,
                role:ROLE
            }
        }
    }
}