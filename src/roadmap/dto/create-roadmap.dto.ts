export class FaseItemDto {
  titulo: string;
  descricao: string;
  concluido: boolean;
}

export class RoadmapFaseDto {
  titulo: string;
  cor: string;
  itens: FaseItemDto[];
}

export class CreateRoadmapDto {
  titulo: string;
  usuarioLogin: string;
  fases: RoadmapFaseDto[];
}
