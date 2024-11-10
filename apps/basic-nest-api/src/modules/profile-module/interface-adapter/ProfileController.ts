import { CrudController } from "src/modules/core-module/application/CrudController";
import { Controller } from "@nestjs/common";
import { Profile } from "../domain/Profile";
import { ProfileRepository } from "./ProfileRepository";
import { ProfileViewDataParser } from "./ProfileViewDataParser";
import { ProfileModel } from "../domain/ProfileModel";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";

@ApiTags("profiles")
@Controller("api/profiles")
export class ProfileController extends CrudController<Profile, ProfileModel> {
    constructor(
        public readonly _repository: ProfileRepository,
        public readonly _viewDataParser: ProfileViewDataParser,
    ) {
        super(_repository, _viewDataParser);
        console.log(this.constructor.name);
    }

    override async get(id: string): Promise<ProfileModel> {
        return super.get(id);
    }

    override async create(entity: ProfileModel): Promise<ProfileModel> {
        return super.create(entity);
    }

    override async getAll(): Promise<ProfileModel[]> {
        return super.getAll();
    }

    override async update(id: string, entity: ProfileModel): Promise<ProfileModel> {
        return super.update(id, entity);
    }

    override async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}

ProfileController.applyDecorators(ProfileController, ProfileModel);
