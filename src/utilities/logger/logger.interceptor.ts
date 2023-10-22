import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Propiedades del context: ', Object.keys(context));
    // console.log('contextType: ', context['contextType']);
    // console.log(Object.keys(context.getArgs()));
    // console.log(context.getArgs());

    const [req, res] = context.getArgs();

    console.log(req.method);
    console.log('Before', req.params);
    
    return next.handle()
      .pipe(
        tap(value => console.log('Respuesta del serv: ', value))
      );
  }
}
