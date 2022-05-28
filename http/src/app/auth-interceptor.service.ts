import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){//intercept() metodu 2 parametre alır ve kullanımı şekilde olduğu gibidir
    console.log('Request is on its way');
    console.log(req.url);
    const modifiedRequest = req.clone({//clone() JS objesi alır
      headers: req.headers.append('Auth', 'xyz') //(interceptor)önleyicimiz, tüm giden istekler için (Auth:xyz)bunu ekliyor ve bu nedenle, önleyiciler çok önemli ve kullanışlı bir özellik.
      //Browser da Network->Request Hedars ta incelediğimizde eklendiğini görürüz
    })
    return next.handle(modifiedRequest);
  }

}
