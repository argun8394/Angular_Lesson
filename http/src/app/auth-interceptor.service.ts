import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){//intercept() metodu 2 parametre alır ve kullanımı şekilde olduğu gibidir
    console.log('Request is on its way')
    return next.handle(req);
  }

}
