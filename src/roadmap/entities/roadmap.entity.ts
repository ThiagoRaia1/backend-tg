import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

class Item {
  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({ default: false })
  concluido: boolean;
}

@Entity()
export class Roadmap {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  titulo: string;

  @Column()
  cor: string;

  @Column()
  usuarioLogin: string; // Relaciona com o login único do usuário

  @Column((type) => Item)
  itens: Item[];
}
