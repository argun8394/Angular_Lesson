import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.user ={//******fetching route parameters ******
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }


    /*Paramss here is an observable

observables are a feature added by some other third party package, not by Angular but heavily used by Angular which allow you to easily work with asynchronous tasks ,

this therefore actually is the approach you should take to be really safe against changes not being, reflected in your template ,
Paramss burada gözlemlenebilir

gözlemlenebilirler, başka bir üçüncü taraf paketi tarafından eklenen, Angular tarafından değil, Angular tarafından yoğun olarak kullanılan ve asenkron görevlerle kolayca çalışmanıza izin veren bir özelliktir.

bu nedenle, şablonunuza yansıtılmayan değişikliklere karşı gerçekten güvenli olmak için izlemeniz gereken yaklaşım budur******* aşağıdaki metod içindir.********/
    this.paramsSubscription=this.route.params.subscribe((params: Params) => {//Fetching Route Parameters Reactively
      this.user.id = params['id'];
      this.user.name = params['name'];
    })
  }

  ngOnDestroy(){
this.paramsSubscription.unsubscribe();
  }

}
