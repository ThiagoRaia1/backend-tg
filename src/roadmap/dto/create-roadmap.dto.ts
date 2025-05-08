export class RoadmapItemDto {
  titulo: string;
  descricao: string;
  concluido: boolean;
}

export class CreateRoadmapDto {
  titulo: string;
  cor: string;
  usuarioLogin: string;
  itens: RoadmapItemDto[];
}
