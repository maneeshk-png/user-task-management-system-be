// auth/guards/local-auth.guard.ts
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {} // This guard uses the 'local' strategy defined in the LocalStrategy class. It will automatically handle the authentication process when applied to a route.
