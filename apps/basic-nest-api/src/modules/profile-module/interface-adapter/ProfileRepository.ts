import { IRepository } from "src/modules/core-module/application/Repository";
import { MongoDbRepository } from "src/modules/core-module/interface-adapters/MongoDbRepository";
import { Injectable } from "@nestjs/common";
import { MongoDbDriver } from "src/modules/core-module/interface-adapters/MongoDbDriver";
import { Profile } from "../domain/Profile";
import { ProfileDataParser } from "./ProfileDataParser";
import { ProfileDAO } from "../domain/ProfileDao";

export type IUserRepository = IRepository<Profile>;

@Injectable()
export class ProfileRepository extends MongoDbRepository<Profile, ProfileDAO> implements IUserRepository {
    constructor(
        public readonly _driver: MongoDbDriver,
        public readonly _dataParser: ProfileDataParser,
    ) {
        super(_driver, _driver.driver.collection("Profiles"), _dataParser);
    }

    async findByEmail(email: string): Promise<Profile | undefined> {
        const dao = await this._collection.findOne({ email: email });
        if (dao) {
            return this._dataParser.toEntity(dao);
        }

        return undefined
    }
}
