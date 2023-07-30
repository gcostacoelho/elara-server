import { ApiProperty } from "@nestjs/swagger";

export class TaskDto {
    
    @ApiProperty()
    nomeTarefa: string;

    @ApiProperty()
    dataEntrega: Date;

    @ApiProperty()
    nomeLista: string;
}