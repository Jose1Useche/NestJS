import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { generateHash, validateUser } from 'src/utilities/security/bcryptHandler';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    constructor
    (
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2
    ) {}

    async create(registerAuthDto: RegisterAuthDto): Promise<User> {
        const { password, ...newUser } = registerAuthDto;
        const userHashed = { ...newUser, password: await generateHash(password) }
        const newRegister = new this.userModel(userHashed);

        const userSaved = await newRegister.save();

        this.eventEmitter.emit('user.created', userSaved);

        return userSaved;
    }

    async login(userLogin: LoginAuthDto): Promise<any> {
        const userToCheck = await this.userModel.findOne({ email: userLogin.email });
        if (userToCheck) {
            const isValidated = await validateUser(userLogin.password, userToCheck.password);
            if (isValidated) {
                const payload = { id: userToCheck._id, username: userToCheck.name, roles: userToCheck.roles };
                return { access_token: await this.jwtService.signAsync(payload) };
            } else {
                return 'Incorrect Password';
            }
        } else {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    }
}
