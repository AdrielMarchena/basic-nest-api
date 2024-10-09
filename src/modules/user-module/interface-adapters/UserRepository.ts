import { IRepository } from "src/modules/core-module/application/Repository";
import { User } from "../domain/User";
import { RedisRepository } from "src/modules/core-module/interface-adapters/RedisRepository";
import { RedisDbDriver } from "src/modules/core-module/interface-adapters/RedisDbDriver";
import { UserDataParser } from "./UserDataParser";
import { Injectable } from "@nestjs/common";

export type IUserRepository = IRepository<User>;

@Injectable()
export class UserRepository extends RedisRepository<User> implements IUserRepository {
    constructor(
        public readonly _driver: RedisDbDriver,
        public readonly _dataParser: UserDataParser,
    ) {
        super(_driver, "Users", _dataParser);
    }
}
