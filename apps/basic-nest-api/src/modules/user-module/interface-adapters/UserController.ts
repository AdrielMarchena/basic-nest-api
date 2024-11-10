import { CrudController } from "src/modules/core-module/application/CrudController";
import { UserRepository } from "./UserRepository";
import { UserViewDataParser } from "./UserViewDataParser";
import { UserModel } from "../domain/UserModel";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@repo/access";

@ApiTags("users")
@Controller("api/users")
export class UserController extends CrudController<User, UserModel> {
    constructor(
        public readonly _repository: UserRepository,
        public readonly _viewDataParser: UserViewDataParser,
    ) {
        super(_repository, _viewDataParser);
    }

    override async get(id: string): Promise<UserModel> {
        return super.get(id);
    }

    override async create(entity: UserModel): Promise<UserModel> {
        return super.create(entity);
    }

    override async getAll(): Promise<UserModel[]> {
        return super.getAll();
    }

    override async update(id: string, entity: UserModel): Promise<UserModel> {
        return super.update(id, entity);
    }

    override async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}

UserController.applyDecorators(UserController, UserModel);
