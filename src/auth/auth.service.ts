import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.find({ name });
    if (!user) {
      throw new NotFoundException('No se pudo encontrar un user con ese nombre');
    }
    const validPass = await bcrypt.compare(pass, user.password);
    if (!validPass) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
