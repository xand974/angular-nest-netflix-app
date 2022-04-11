import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { TokenModel } from 'src/types';
import { SaveDto } from './dto/save.dto';
import { Token } from './schema/token.schema';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async genToken({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
    return await this.jwtService.sign(
      { userId, isAdmin },
      {
        secret: process.env.SECRET_TOKEN,
        expiresIn: '1d',
      },
    );
  }

  async save(saveDto: SaveDto) {
    const expiresIn = (Date.now() + 1).toString();
    const token = new this.tokenModel({ ...saveDto, expiresIn });
    const savedToken = (await token.save()) as TokenModel;
    return savedToken;
  }

  async deleteToken(id: string) {
    const token = await this.tokenModel.findById(id);
    if (!token)
      throw new HttpException('token not found', HttpStatus.NOT_FOUND);
    return token;
  }

  async verifyToken(request: Request) {
    const tokenHeader = request.headers['authorization'] as string;
    if (!tokenHeader) return false;
    const token = tokenHeader.split(' ')[1];
    const res = this.jwtService.verify(token, {
      secret: process.env.SECRET_TOKEN,
    });
    console.log(res);
  }
}
