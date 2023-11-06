import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>('rol', context.getHandler());
    
    const req = context.switchToHttp().getRequest();
    const { roles } = req['user'];

    // console.log('Mi rol: ', roles);

    const isAllow = roles.some((rol: string) => getRolMeta.includes(rol));
    return isAllow;
  }
}
