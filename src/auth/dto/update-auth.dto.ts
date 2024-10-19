//NestJS
import { PartialType } from '@nestjs/mapped-types';

//DTO
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
