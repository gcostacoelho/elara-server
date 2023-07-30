import { ApiProperty } from "@nestjs/swagger";

export class TaskDtoWithDelivery {
    
    @ApiProperty()
    nomeTarefa: string;

    @ApiProperty()
    dataEntrega: Date;

    @ApiProperty()
    concluida: boolean;
}