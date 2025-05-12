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

  findOne(id: number) {
    return `This action returns a #${id} roadmap`;
  }

  async findOneByLogin(titulo: string, usuarioLogin: string) {
    return this.roadmapRepository.findOne({
      where: {
        titulo,
        usuarioLogin,
      },
    });
  }

  update(id: number, updateRoadmapDto: UpdateRoadmapDto) {
    return `This action updates a #${id} roadmap`;
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
