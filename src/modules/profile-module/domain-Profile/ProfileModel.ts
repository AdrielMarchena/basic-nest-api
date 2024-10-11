import { ApiProperty } from "@nestjs/swagger";

export class ProfileModel {
    @ApiProperty()
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
    birth: Date;
    @ApiProperty()
    describe: string;
    @ApiProperty()
    password: string;
}
