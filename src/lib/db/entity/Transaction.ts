import {
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Sacco } from "./Sacco";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  code!: string;

  @Column({ default: 0.0, type: "decimal" })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.outgoingTransactions)
  @JoinColumn()
  sender!: User;

  @ManyToOne(() => User, (user) => user.incomingTransactions)
  @JoinColumn()
  recipient!: User;


}
