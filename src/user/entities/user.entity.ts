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

  getFormattedCreateTime(): string {
    // 自定义时间格式化方式，这里以 'YYYY-MM-DD HH:mm:ss' 格式表示
    const formattedDate = `${this.createTime.getFullYear()}-${(this.createTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.createTime.getDate().toString().padStart(2, '0')} ${this.createTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${this.createTime.getMinutes().toString().padStart(2, '0')}:${this.createTime
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  }

  getFormattedUpdateTime(): string {
    // 自定义时间格式化方式，这里以 'YYYY-MM-DD HH:mm:ss' 格式表示
    const formattedDate = `${this.updateTime.getFullYear()}-${(this.updateTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.updateTime.getDate().toString().padStart(2, '0')} ${this.updateTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${this.updateTime.getMinutes().toString().padStart(2, '0')}:${this.updateTime
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  }
}
