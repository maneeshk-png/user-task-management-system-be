import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../constants/auth.constants";

export const getJwtConfig =(configService:ConfigService,):JwtModuleOptions=>({
    secret:configService.get<string>('JWT_SECRET'),
    signOptions:{
        expiresIn: JWT_CONSTANTS.expiresIn,
    },
})