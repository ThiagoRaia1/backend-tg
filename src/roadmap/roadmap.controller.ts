import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  async create(@Body() createRoadmapDto: CreateRoadmapDto) {
    const result = await this.roadmapService.create(createRoadmapDto);
    console.log('Salvo no banco:', result); // Debug útil
    return result;
  }

  @Get()
  findAll() {
    return this.roadmapService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roadmapService.findOne(+id);
  // }

  @Get(':titulo/:usuarioLogin')
  async findOne(
    @Param('titulo') titulo: string,
    @Param('usuarioLogin') usuarioLogin: string,
  ) {
    return await this.roadmapService.findOneByLogin(titulo, usuarioLogin);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoadmapDto: UpdateRoadmapDto) {
    return this.roadmapService.update(+id, updateRoadmapDto);
  }

  @Patch('roadmap/:tema/:faseIndex/:itemIndex')
  async atualizarItem(
    @Param('tema') tema: string,
    @Param('faseIndex') faseIndex: number,
    @Param('itemIndex') itemIndex: number,
    @Body('usuarioLogin') usuarioLogin: string,
    @Body('concluido') concluido: boolean,
  ) {
    return this.roadmapService.atualizarConclusaoItem(
      tema,
      faseIndex,
      itemIndex,
      usuarioLogin,
      concluido,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadmapService.remove(+id);
  }
}
