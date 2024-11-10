import { IViewDataParser } from "src/modules/core-module/domain/ViewDataParser";
import { Injectable } from "@nestjs/common";
import { v4 as newId } from 'uuid';
import { Profile } from "../domain-Profile/Profile";
import { ProfileModel } from "../domain-Profile/ProfileModel";

@Injectable()
export class ProfileViewDataParser implements IViewDataParser<Profile, ProfileModel> {

    toModel(entity: Profile): ProfileModel {
        console.log(entity);
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            name: entity.name,
            email: entity.email,
            describe: entity.describe,
            birth: entity.birth,
            password: entity.password,
        };
    }

    toNewEntity(model: ProfileModel): Profile {
        return Profile.newFromProfileData(
            {
                id: model.id ?? newId(),
                createdAt: model.createdAt ?? new Date(),
                updatedAt: model.updatedAt ?? new Date(),
                name: model.name,
                email: model.email,
                describe: model.describe,
                birth: model.birth,
                password: model.password,
            }
        );
    }

    toEntity(model: ProfileModel): Profile {
        return Profile.fromProfileData(
            {
                id: model.id,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
                name: model.name,
                email: model.email,
                describe: model.describe,
                birth: model.birth,
                password: model.password,
            }
        );
    }
}