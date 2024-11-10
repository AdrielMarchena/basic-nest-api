import { IRepository } from "src/modules/core-module/application/Repository";
import { User } from "../domain/User";
import { MongoDbRepository } from "src/modules/core-module/interface-adapters/MongoDbRepository";
import { UserDataParser } from "./UserDataParser";
import { Injectable } from "@nestjs/common";
import { UserDAO } from "../domain/UserDao";
import { MongoDbDriver } from "src/modules/core-module/interface-adapters/MongoDbDriver";

export type IUserRepository = IRepository<User>;

@Injectable()
export class UserRepository extends MongoDbRepository<User, UserDAO> implements IUserRepository {
    constructor(
        public readonly _driver: MongoDbDriver,
        public readonly _dataParser: UserDataParser,
    ) {
        super(_driver, _driver.driver.collection("Users"), _dataParser);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const dao = await this._collection.findOne({ email: email });
        if (dao) {
            return this._dataParser.toEntity(dao);
        }

        return undefined
    }
}
