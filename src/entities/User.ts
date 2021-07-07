import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  firstName: string;

  @Column({
    type: "varchar",
  })
  lastName: string;

  @Column({
    type: "varchar",
  })
  email: string;
}
