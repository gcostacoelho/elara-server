import { ApiProperty } from "@nestjs/swagger";

export class TaskDtoWithDelivery {
    
    @ApiProperty()
    nomeTarefa: string;

    @ApiProperty()
    dataEntrega: Date;

    @ApiProperty()
    nomeLista: string;

    @ApiProperty()
    entregue: boolean;
}