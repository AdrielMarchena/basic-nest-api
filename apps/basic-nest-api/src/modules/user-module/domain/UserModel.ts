import { ApiProperty } from "@nestjs/swagger";

export class UserModel {
    @ApiProperty({ example: "123", default: "123" })
    id: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}