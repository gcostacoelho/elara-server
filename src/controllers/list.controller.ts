import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ListService } from "src/services/list.service";

@ApiTags('List')
@ApiBearerAuth()
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

}