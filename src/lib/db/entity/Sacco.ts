import {
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

@Entity()
export class Sacco {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: false, type: "text" })
  name!: string;

  @Column({ unique: true, type: "text", nullable: true })
  code!: string;

  @Column({ unique: false, type: "text" })
  country!: string;

  @Column({
    default: 0.0,
    type: "real",
  })
  balance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.sacco)
  @JoinColumn()
  users!: User[];
}
