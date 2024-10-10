import { Injectable } from "@nestjs/common";
import { IDataParser } from "src/modules/core-module/domain/DataParser";
import { Profile } from "../domain-Profile/Profile";
import { ProfileDAO } from "../domain-Profile/ProfileDao";

@Injectable()
export class ProfileDataParser implements IDataParser<Profile, ProfileDAO> {
    toDAO(entity: Profile): ProfileDAO {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            name: entity.name,
            email: entity.email,
            birth: entity.birth,
            describe: entity.describe,
            password: entity.password,
        };
    }

    toEntity(dao: ProfileDAO): Profile {
        return Profile.fromProfileData({
            id: dao.id,
            createdAt: dao.createdAt,
            updatedAt: dao.updatedAt,
            name: dao.name,
            email: dao.email,
            birth: dao.birth,
            describe: dao.describe,
            password: dao.password,
        });
    }
}