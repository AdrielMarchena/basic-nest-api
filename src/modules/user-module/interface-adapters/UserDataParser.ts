import { Injectable } from "@nestjs/common";
import { IDataParser } from "src/modules/core-module/domain/DataParser";
import { User } from "src/modules/user-module/domain/User";
import { UserDAO } from "../domain/UserDao";

@Injectable()
export class UserDataParser implements IDataParser<User, UserDAO> {
    toDAO(entity: User): UserDAO {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            name: entity.name,
            email: entity.email,
            password: entity.password,
        };
    }

    toEntity(dao: UserDAO): User {
        return User.fromData({
            id: dao.id,
            createdAt: dao.createdAt,
            updatedAt: dao.updatedAt,
            name: dao.name,
            email: dao.email,
            password: dao.password,
        });
    }
}