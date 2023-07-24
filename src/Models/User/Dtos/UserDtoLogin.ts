import { ApiProperty } from "@nestjs/swagger";

export class UserDtoLogin {
    @ApiProperty()
    email: string

    @ApiProperty()
    senha: string
}