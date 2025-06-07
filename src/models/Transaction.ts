import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import Account from "./Account";

export type TransactionType = "debit" | "credit";
export type TransactionOperation =
  | "deposit"
  | "withdraw"
  | "bonus"
  | "tax"
  | "transfer";
@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ["debit", "credit"] })
  type!: TransactionType;

  @Column({
    type: "enum",
    enum: ["deposit", "withdraw", "bonus", "tax", "transfer"],
  })
  operation!: TransactionOperation;

  @Column("decimal", { precision: 10, scale: 2 })
  value!: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @CreateDateColumn()
  createdAt!: Date;
}
