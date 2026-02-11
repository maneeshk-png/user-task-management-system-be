import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../constants/auth.constants";

export const getJwtConfig =(configService:ConfigService,):JwtModuleOptions=>({ // This function returns the configuration options.
    secret:configService.get<string>('JWT_SECRET'),
    signOptions:{
        expiresIn: JWT_CONSTANTS.expiresIn, // This sets the expiration time for the JWT tokens, which is defined in the JWT_CONSTANTS.

    },
})