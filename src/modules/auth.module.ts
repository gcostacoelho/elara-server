import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from 'src/services/user.service';
import { UserModule } from './user.module';
import { PrismaConfig } from 'src/database/prismaConfig';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET
        })],
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaConfig],
})
export class AuthModule { }