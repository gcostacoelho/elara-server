import { ApiProperty } from "@nestjs/swagger";

export class SearchWeatherDto {
    @ApiProperty()
    cityName: string;

    @ApiProperty()
    countryCode: string;
}