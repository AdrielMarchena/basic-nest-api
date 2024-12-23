import { IViewDataParser } from "src/modules/core-module/domain/ViewDataParser";
import { User } from "@repo/access";
import { UserModel } from "../domain/UserModel";
import { Injectable } from "@nestjs/common";
import { v4 as newId } from 'uuid';

@Injectable()
export class UserViewDataParser implements IViewDataParser<User, UserModel> {

    toModel(entity: User): UserModel {
        console.log(entity);
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            name: entity.name,
            email: entity.email,
            password: entity.password,
        };
    }

    toNewEntity(model: UserModel): User {
        return User.newFromData(
            {
                id: model.id ?? newId(),
                createdAt: model.createdAt ?? new Date(),
                updatedAt: model.updatedAt ?? new Date(),
                name: model.name,
                email: model.email,
                password: model.password,
            }
        );
    }

    toEntity(model: UserModel): User {
        return User.fromData(
            {
                id: model.id,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
                name: model.name,
                email: model.email,
                password: model.password,
            }
        );
    }
}