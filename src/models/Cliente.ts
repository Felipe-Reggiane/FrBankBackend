import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  senha!: string;
}
