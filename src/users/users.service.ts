import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { CustomLogger } from 'src/common/logger';

@Injectable()
export class UsersService {
  private readonly logger = new CustomLogger(UsersService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
    const createdUser = await this.userModel.create(createUserDto);
    const userObject = createdUser.toObject();
    delete userObject.password;
    this.logger.log('Created User: ', JSON.stringify(userObject));
    return userObject;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Find all users');
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async update(id: string, updateUserDto: Partial<CreateUserDTO>): Promise<User> {
    if (Object.keys(updateUserDto).length === 0) {
      this.logger.error('El cuerpo de la solicitud no puede estar vacío.');
      throw new BadRequestException('El cuerpo de la solicitud no puede estar vacío.');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    if (!updatedUser) {
      this.logger.error(`No se pudo encontrar el usuario con el id ${id}`);
      throw new BadRequestException('Usuario no encontrado.');
    }

    const updatedUserObject = updatedUser.toObject();
    delete updatedUserObject.password;
    this.logger.log(`Usuario actualizado: `, JSON.stringify(updatedUserObject));
    return updatedUserObject as User;
  }

  async find(query: Partial<CreateUserDTO>): Promise<User | null> {
    return this.userModel.findOne(query).exec();
  }
}
