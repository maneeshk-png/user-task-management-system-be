import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthRoutes } from './constants/auth.routes';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller(AuthRoutes.BASE) //base route
export class AuthController {
    constructor(private readonly authService:AuthService){}

    // POST  /auth/register
    @Post(AuthRoutes.REGISTER)
    async register(@Body() registerDto:RegisterDto){
        return this.authService.register(registerDto);
    }

    // POST  /auth/login
    @Post(AuthRoutes.LOGIN)
    @UseGuards(LocalAuthGuard) // Apply local auth guard to this route
    async login(@Req() req: any) {
        return this.authService.login(req.user);
    }
}
