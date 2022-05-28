import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    //Bu şekilde interceptor lerin provide sırasını  yaparsak -> burada sadece bir önleyicide ayarlamadığımız özel başlığı aldık, yine de auth başlığını kaçırıyoruz. Bu yüzden interceptorlerin privede sıra önemlidir, ancak bunun dışında, birden fazla önleyici sağlamak, anlayabileceğiniz gibi son derece basittir.
    {provide:HTTP_INTERCEPTORS,
      useClass:LoggingInterceptorService,
      multi:true
    },
    {provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],//interceptor provide etme bu şekildedir
  bootstrap: [AppComponent]
})
export class AppModule {}
