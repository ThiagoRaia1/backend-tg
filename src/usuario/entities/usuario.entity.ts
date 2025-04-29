import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Usuario {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column(/*{ unique: true }*/)
  login: string;

  @Column()
  senha: string;

  @Column()
  nome: string;
}
