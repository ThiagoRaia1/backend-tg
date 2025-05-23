import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  async create(@Body() createRoadmapDto: CreateRoadmapDto) {
    console.log("create")
    const result = await this.roadmapService.create(createRoadmapDto);
    // console.log('Salvo no banco:', result); // Debug útil
    return result;
  }

  @Get()
  findAll() {
    console.log("findAll")
    return this.roadmapService.findAll();
  }

  @Get(':titulo/:usuarioLogin')
  async findOne(
    @Param('titulo') titulo: string,
    @Param('usuarioLogin') usuarioLogin: string,
  ) {
    console.log("findOne")
    const roadmap = await this.roadmapService.findOneByLogin(
      titulo,
      usuarioLogin,
    );

    if (!roadmap) {
      throw new NotFoundException('Roadmap não encontrado para o usuário.');
    }

    return roadmap;
  }

  @Patch('item/:tema/:faseIndex/:itemIndex')
  async atualizarItem(
    @Param('tema') tema: string,
    @Param('faseIndex') faseIndex: number,
    @Param('itemIndex') itemIndex: number,
    @Body('usuarioLogin') usuarioLogin: string,
    @Body('concluido') concluido: boolean,
  ) {
    console.log("atualizarItem")
    return this.roadmapService.atualizarConclusaoItem(
      tema,
      faseIndex,
      itemIndex,
      usuarioLogin,
      concluido,
    );
  }

  @Patch('nomeRoadmap/:temaAtual/:login')
  async atualizarNomeRoadmap(
    @Param('temaAtual') temaAtual: string,
    @Param('login') login: string,
    @Body('tema') novoTema: string,
  ) {
    console.log("atualizarNomeRoadmap")
    return this.roadmapService.atualizarNomeRoadmap(novoTema, temaAtual, login);
  }

  @Patch('descricao/:titulo/:login')
  async editarDescricaoItem(
    @Param('titulo') titulo: string,
    @Param('login') login: string,
    @Body('fase') fase: string,
    @Body('item') item: string,
    @Body('novaDescricao') novaDescricao: string,
  ) {
    console.log("editarDescricaoItem")
    return this.roadmapService.editarDescricaoItem(
      titulo,
      login,
      fase,
      item,
      novaDescricao,
    );
  }

  @Delete(':login/:titulo')
  remove(
    @Param('login') login: string,
    @Param('titulo') titulo: string,
  ): Promise<void> {
    console.log("remove")
    return this.roadmapService.remove(login, titulo);
  }
}
