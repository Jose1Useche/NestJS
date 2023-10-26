import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { generateHash, validateUser } from 'src/utilities/security/bcryptHandler';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(registerAuthDto: RegisterAuthDto): Promise<User> {
        const { password, ...newUser } = registerAuthDto;
        const userHashed = { ...newUser, password: await generateHash(password) }
        const newRegister = new this.userModel(userHashed);
        return await newRegister.save();
    }

    async login(userLogin: LoginAuthDto): Promise<any> {
        const userToCheck = await this.userModel.findOne({ email: userLogin.email });
        if (userToCheck) {
            return await validateUser(userLogin.password, userToCheck.password)
        } else {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    }
}
