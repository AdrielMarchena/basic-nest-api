import { CrudController } from "src/modules/core-module/application/CrudController";
import { UserRepository } from "./UserRepository";
import { UserViewDataParser } from "./UserViewDataParser";
import { User } from "../domain/User";
import { UserModel } from "../domain/UserModel";
import { Controller } from "@nestjs/common";

@Controller("api/users")
export class UserController extends CrudController<User, UserModel> {
    constructor(
        public readonly _repository: UserRepository,
        public readonly _viewDataParser: UserViewDataParser,
    ) {
        super(_repository, _viewDataParser);
    }
}
