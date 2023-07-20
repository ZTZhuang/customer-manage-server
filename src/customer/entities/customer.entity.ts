import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'customer',
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 20,
  })
  name: string;
}
