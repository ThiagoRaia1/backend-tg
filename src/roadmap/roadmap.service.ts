import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roadmap } from './entities/roadmap.entity';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly roadmapRepository: Repository<Roadmap>,
  ) {}

  async create(createRoadmapDto: CreateRoadmapDto): Promise<Roadmap> {
    for (const fase of createRoadmapDto.fases) {
      for (const item of fase.itens) {
        item.concluido = false;
      }
    }
    const roadmap = this.roadmapRepository.create(createRoadmapDto); // melhor que salvar direto
    return await this.roadmapRepository.save(roadmap);
  }

  async findAll(): Promise<Roadmap[]> {
    return this.roadmapRepository.find(); // Isso busca todos os documentos
  }

  async findOneByLogin(titulo: string, usuarioLogin: string) {
    return this.roadmapRepository.findOne({
      where: {
        titulo,
        usuarioLogin,
      },
    });
  }

  async atualizarConclusaoItem(
    tema: string,
    faseIndex: number,
    itemIndex: number,
    usuarioLogin: string,
    concluido: boolean,
  ) {
    const roadmap = await this.roadmapRepository.findOne({
      where: { titulo: tema, usuarioLogin },
    });

    if (!roadmap) throw new NotFoundException('Roadmap não encontrado');

    roadmap.fases[faseIndex].itens[itemIndex].concluido = concluido;

    return this.roadmapRepository.save(roadmap);
  }

  async atualizarNomeRoadmap(
    novoTema: string,
    temaAtual: string,
    usuarioLogin: string,
  ) {
    const roadmap = await this.roadmapRepository.findOne({
      where: { titulo: temaAtual, usuarioLogin },
    });

    // console.log("temaAtual: " + temaAtual)
    // console.log("usuarioLogin: " + usuarioLogin)
    // console.log("novoTema: " + novoTema)
    //console.log(roadmap)

    if (!roadmap) throw new NotFoundException('Roadmap não encontrado');

    roadmap.titulo = novoTema;

    return this.roadmapRepository.save(roadmap);
  }

  async editarDescricaoItem(
    titulo: string,
    usuarioLogin: string,
    fase: string,
    item: string,
    novaDescricao: string,
  ) {
    console.log(titulo);
    console.log(usuarioLogin);
    const roadmap = await this.roadmapRepository.findOneBy({
      titulo,
      usuarioLogin,
    });

    console.log('2');
    if (roadmap) console.log('AAAAAAAAAA');

    if (!roadmap) throw new NotFoundException('aaaaaRoadmap não encontrado');

    // const fase = roadmap.fases.find((f) => f.titulo === tituloFase);
    // if (!fase) throw new NotFoundException('Fase não encontrada');

    // const item = fase.itens.find((i) => i.titulo === tituloItem);
    // if (!item) throw new NotFoundException('Item não encontrado');

    roadmap.fases.forEach((f)=> console.log(f))

    roadmap.

    const faseRoadmap = roadmap.fases.find((f) => f.titulo === titulo);
    const itemRoadmap = faseRoadmap?.itens.find((i) => i.titulo === item);

    console.log(faseRoadmap);
    console.log(itemRoadmap?.descricao);
    if (itemRoadmap) {
      itemRoadmap.descricao = novaDescricao;
      console.log(itemRoadmap.descricao);
    }
    // item.descricao = novaDescricao;

    // roadmap.titulo = novoTema;

    return this.roadmapRepository.save(roadmap);
  }

  async remove(usuarioLogin: string, titulo: string): Promise<void> {
    const roadmap = await this.roadmapRepository.findOne({
      where: {
        usuarioLogin,
        titulo,
      },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap não encontrado');
    }

    await this.roadmapRepository.remove(roadmap);
  }
}
