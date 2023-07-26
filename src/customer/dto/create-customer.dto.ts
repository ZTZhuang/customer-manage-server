import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  email?: string;
  industry?: string;
  address?: string;
  createBy?: number;
  remark?: string;
}
