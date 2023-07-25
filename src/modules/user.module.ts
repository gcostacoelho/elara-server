import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { PrismaConfig } from "src/database/prismaConfig";
import { UserService } from "src/services/user.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaConfig],
    exports: [UserService]
})

export class UserModule { }