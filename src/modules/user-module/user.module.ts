import { Module } from "@nestjs/common";
import { RedisDbDriver } from "../core-module/interface-adapters/RedisDbDriver";
import { UserDataParser } from "./interface-adapters/UserDataParser";
import { UserRepository } from "./interface-adapters/UserRepository";
import { UserViewDataParser } from "./interface-adapters/UserViewDataParser";
import { UserController } from "./interface-adapters/UserController";

@Module({
    imports: [],
    controllers: [
        UserController
    ],
    providers: [
        UserDataParser,
        UserViewDataParser,
        UserRepository,
        {
            provide: RedisDbDriver,
            useFactory: async () => {
                const instance = new RedisDbDriver()
                await instance.connect()
                return instance
            }
        }
    ],
})
export class UserModule { }
