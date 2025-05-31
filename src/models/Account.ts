import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Client from "./Client";

@Entity()
export default class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  number!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "cliente_id" })
  client!: Client;
}
