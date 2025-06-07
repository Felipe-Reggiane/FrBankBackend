import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import Account from "./Account";

export type TransactionType = "debit" | "credit" | "bonus" | "tax";

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ["debit", "credit", "bonus", "tax"] })
  type!: TransactionType;

  @Column("decimal", { precision: 10, scale: 2 })
  value!: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @CreateDateColumn()
  createdAt!: Date;
}
