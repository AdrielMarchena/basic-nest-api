import { Entity } from "src/modules/core-module/domain/Entity";
import { v4 as newId } from 'uuid';

export interface UserData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    password: string;
}

export class User extends Entity {
    constructor(
        public readonly id: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) {
        super(id, createdAt, updatedAt);
    }

    public static start(
        name: string,
        email: string,
        password: string
    ): User {
        return new User(newId(), new Date(), new Date(), name, email, password);
    }

    public static fromData(data: UserData): User {
        return new User(data.id, data.createdAt, data.updatedAt, data.name, data.email, data.password);
    }

    public static newFromData(data: Partial<UserData>): User {
        return new User(
            newId(),
            new Date(),
            new Date(),
            data.name,
            data.email,
            data.password
        );
    }

    public withName(name: string): User {
        return this.copyWith({ name });
    }

    public withEmail(email: string): User {
        return this.copyWith({ email });
    }

    public withPassword(password: string): User {
        return this.copyWith({ password });
    }

    private copyWith(other: Partial<User>): User {
        return new User(
            other.id ?? this.id,
            other.createdAt ?? this.createdAt,
            other.updatedAt ?? this.updatedAt,
            other.name ?? this.name,
            other.email ?? this.email,
            other.password ?? this.password
        );
    }
}
