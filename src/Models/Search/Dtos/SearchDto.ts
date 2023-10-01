import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty()
    request: string;

}