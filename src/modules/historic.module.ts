import { HistoricController } from '../controllers/historic.controller';
import { PrismaConfig } from '../database/prismaConfig';
import { HistoricService } from '../services/historic.service';

import { Module } from '@nestjs/common';

@Module({
    controllers: [HistoricController],
    providers: [HistoricService, PrismaConfig],
    exports: [HistoricService]
})
export class HistoricModule { }
