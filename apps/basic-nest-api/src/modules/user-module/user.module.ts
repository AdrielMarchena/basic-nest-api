import { Module } from "@nestjs/common";
import { UserDataParser } from "./interface-adapters/UserDataParser";
import { UserRepository } from "./interface-adapters/UserRepository";
import { UserViewDataParser } from "./interface-adapters/UserViewDataParser";
import { UserController } from "./interface-adapters/UserController";
import { MongoDbDriver } from "../core-module/interface-adapters/MongoDbDriver";

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
            provide: MongoDbDriver,
            useFactory: async () => {
                const instance = new MongoDbDriver(
                    'mongodb://localhost:27017',
                    "api"
                )
                await instance.connect()
                return instance
            }
        }
    ],
})
export class UserModule { }
