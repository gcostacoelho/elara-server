import { Module } from '@nestjs/common';

import { SearchService } from './../services/search.service';
import { SearchController } from '../controllers/search.controller';
import { Search } from 'src/Models/Search/Search';

@Module({
    imports: [],
    controllers: [SearchController],
    providers: [SearchService, Search],
})
export class SearchModule { }
