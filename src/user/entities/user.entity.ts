import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户名'
  })
  username: string;

  @Column({
    comment: '密码'
  })
  password: string;

  @Column({
    comment: '是否管理员'
  })
  isAdmin: boolean;

  @Column({
    comment: '是否停用'
  })
  forbidden: boolean;

  @CreateDateColumn({
    comment: '创建时间'
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间'
  })
  updateTime: Date;

  @OneToMany(() => Customer, customer => customer.user)
  customers: Customer[];
}
