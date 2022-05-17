import { Component, OnDestroy, OnInit } from '@angular/core';


import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription= interval(1000).subscribe( count => {
    //   console.log(count)
    // })
    const customIntervalObservable =new Observable((observer: any) => {
      let count = 0;
      setInterval(() =>{
        observer.next(count);
        if(count == 5 ){//complete ten önce error a girer
          observer.complete();
        }
        if(count > 3 ){
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      },1000);
    })
    this.firstObsSubscription=  customIntervalObservable.subscribe(data => {
      console.log(data)
    },error=>{console.log(error)
      alert(error.message);
    },()=>{console.log('completed')})

  }

  ngOnDestroy(){
this.firstObsSubscription.unsubscribe();
  }

}
