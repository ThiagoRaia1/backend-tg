import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './roadmap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roadmap } from './entities/roadmap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roadmap])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
})
export class RoadmapModule {}
