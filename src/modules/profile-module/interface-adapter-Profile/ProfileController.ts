import { CrudController } from "src/modules/core-module/application/CrudController";
import { Controller } from "@nestjs/common";
import { Profile } from "../domain-Profile/Profile";
import { ProfileRepository } from "./ProfileRepository";
import { ProfileViewDataParser } from "./ProfileViewDataParser";
import { ProfileModel } from "../domain-Profile/ProfileModel";

@Controller("api/profiles")
export class ProfileController extends CrudController<Profile, ProfileModel> {
    constructor(
        public readonly _repository: ProfileRepository,
        public readonly _viewDataParser: ProfileViewDataParser,
    ) {
        super(_repository, _viewDataParser);
    }
}
