import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} from '@/core/utils/jwt.util'

import { ITokenProvider } from '@/core/interfaces/common/token-provider.interface'

export class JwtTokenProvider implements ITokenProvider {
    sign(payload:Record<string,any>,type:'access'|'refresh'):string{
        return type ==='access'
        ?generateAccessToken(payload)
        :generateRefreshToken(payload)
    }
    
    verify(token: string,type:'access'|'refresh'): Record<string, any> {
       return type==='access'
       ?verifyAccessToken(token)
       :verifyRefreshToken(token) 
    }
}