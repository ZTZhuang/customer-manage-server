import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'customer'
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '客户名'
  })
  name: string;

  @Column({
    comment: '联系电话'
  })
  phone: string;

  @Column({
    comment: '邮箱'
  })
  email: string;

  @Column({
    comment: '行业'
  })
  industry: string;

  @Column({
    comment: '地址'
  })
  address: string;

  @Column({
    comment: '创建人id'
  })
  createBy: number;

  @CreateDateColumn({
    comment: '创建时间'
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间'
  })
  updateTime: Date;

  @Column({
    comment: '备注'
  })
  remark: string;

  @ManyToOne(() => User, user => user.customers)
  user: User;

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
