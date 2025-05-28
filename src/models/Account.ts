import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Cliente from "./Cliente";

@Entity()
export default class Conta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  numero!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  saldo!: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente!: Cliente;
}
