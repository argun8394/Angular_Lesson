import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){//intercept() metodu 2 parametre alır ve kullanımı şekilde olduğu gibidir
    console.log('Request is on its way');
    console.log(req.url);
    const modifiedRequest = req.clone({//clone() JS objesi alır
      headers: req.headers.append('Auth', 'xyz') //(interceptor)önleyicimiz, tüm giden istekler için (Auth:xyz)bunu ekliyor ve bu nedenle, önleyiciler çok önemli ve kullanışlı bir özellik.
      //Browser da Network->Request Hedars ta incelediğimizde eklendiğini görürüz
    })
    return next.handle(modifiedRequest).pipe(tap(event=>{
      console.log(event);
      if(event.type === HttpEventType.Response){// Sadece interceptor'ınızın içindeki istekle etkileşime geçemezsiniz, isterseniz yanıtla da etkileşime girebilirsiniz. bunu kaydedebilir, gereksinimleriniz ne olursa olsun manipüle edebilirsiniz.
        console.log('Response arrived, body data');
        console.log(event.body)
      }
    }));
  }

}
