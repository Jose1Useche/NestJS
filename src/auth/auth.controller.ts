import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerHandler(@Body() registerAuthDto: RegisterAuthDto) {
    console.log(registerAuthDto);
    return this.authService.create(registerAuthDto)
      .then(res => {return res})
      .catch(error => { throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE) });
  }
  
  @Post('login')
  loginHandler(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
