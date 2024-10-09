import { Injectable } from "@nestjs/common";
import { IDataParser } from "src/modules/core-module/domain/DataParser";
import { User } from "src/modules/user-module/domain/User";

@Injectable()
export class UserDataParser implements IDataParser<User, string> {
    toDAO(entity: User): string {
        return JSON.stringify({
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            name: entity.name,
            email: entity.email,
            password: entity.password,
        });
    }

    toEntity(dao: string): User {
        const parsed = JSON.parse(dao);
        return User.fromData(parsed);
    }
}