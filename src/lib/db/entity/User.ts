import {
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Sacco } from "./Sacco";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true, type: "text" })
  username!: string;

  @Column({ type: "text", nullable: true })
  code!: string;

  @Column({ nullable: true, default: 0.0, type: "float" })
  balance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Transaction, (t) => t.recipient)
  incomingTransactions!: Transaction[];

  @OneToMany(() => Transaction, (t) => t.recipient)
  outgoingTransactions!: Transaction[];

  @ManyToOne(() => Sacco, (s) => s.users)
  sacco!: Sacco;
}
