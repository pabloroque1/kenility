import { IsNotEmpty, IsString } from 'class-validator';

export class signInDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}