import { Module } from "@nestjs/common";
import { MongoDbDriver } from "../core-module/interface-adapters/MongoDbDriver";
import { ProfileController } from "./interface-adapter/ProfileController";
import { ProfileDataParser } from "./interface-adapter/ProfileDataParser";
import { ProfileViewDataParser } from "./interface-adapter/ProfileViewDataParser";
import { ProfileRepository } from "./interface-adapter/ProfileRepository";

@Module({
    imports: [],
    controllers: [
        ProfileController
    ],
    providers: [
        ProfileDataParser,
        ProfileViewDataParser,
        ProfileRepository,
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
export class ProfileModule { }
