import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // This guard uses the 'jwt' strategy defined in JwtStrategy to protect routes.
