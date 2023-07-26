import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { LoginGuard } from 'src/login.guard';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    return this.customerService.create(createCustomerDto, req.user.id);
  }

  @Get()
  @UseGuards(LoginGuard)
  async findAll(@Request() req) {
    const list = await this.customerService.findAll(req.user.id);
    return list.map((customer: Customer) => {
      return {
        ...customer,
        createTime: customer.getFormattedCreateTime(),
        updateTime: customer.getFormattedUpdateTime()
      };
    });
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
