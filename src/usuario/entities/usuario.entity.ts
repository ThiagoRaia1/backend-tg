import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Usuario {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;
}
