import { Controller } from '@nestjs/common';
import { userRoutes } from './constants/user.constants';

@Controller(userRoutes.BASE) // Base route for users module 
export class UsersController {}
