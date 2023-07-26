import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private customerRepository: Repository<Customer>;

  create(createCustomerDto: CreateCustomerDto, id: number) {
    this.customerRepository.save({
      ...createCustomerDto,
      createBy: id
    });
  }

  findAll(id: number) {
    return this.customerRepository.find({
      where: { createBy: id }
    });
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    this.customerRepository.save({
      id,
      ...updateCustomerDto
    });
  }

  remove(id: number) {
    this.customerRepository.delete(id);
  }
}
