import { Entity } from "src/modules/core-module/domain/Entity";
import { v4 as newId } from 'uuid';

export interface ProfileDate {

    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    birth: Date;
    describe: string;
    password: string;
}

export class Profile extends Entity {
    constructor(

        public readonly id: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly name: string,
        public readonly email: string,
        public readonly birth: Date,
        public readonly describe: string,
        public readonly password: string,

    ) { super(id, updatedAt, createdAt) }

    public static start(

        name: string,
        email: string,
        birth: Date,
        describe: string,
        password: string
    ): Profile {
        return new Profile(newId(), new Date(), new Date(), name, email, birth, describe, password)
    }

    public static fromProfileData(data: ProfileDate): Profile {

        return new Profile(data.id, data.createdAt, data.updatedAt, data.name, data.email, data.birth,
            data.describe, data.password)
    }

    public static newFromProfileData(data: ProfileDate): Profile {

        return new Profile(newId(), new Date(), new Date(), data.name, data.email, data.birth,
            data.describe, data.password)
    }

    public withProfileName(name: string): Profile {

        return this.copyWith({ name })
    }
    public withProfileEmail(email: string): Profile {

        return this.copyWith({ email })
    }
    public withProfileBirth(birth: Date): Profile {

        return this.copyWith({ birth })
    }
    public withProfileDescribe(describe: string): Profile {

        return this.copyWith({ describe })
    }
    public withProfilePassword(password: string): Profile {

        return this.copyWith({ password })
    }

    private copyWith(other: Partial<Profile>): Profile {

        return new Profile(

            other.id ?? this.id,
            other.createdAt ?? this.createdAt,
            other.updatedAt ?? this.updatedAt,
            other.name ?? this.name,
            other.email ?? this.email,
            other.birth ?? this.birth,
            other.describe ?? this.describe,
            other.password ?? this.password
        )
    }
}
