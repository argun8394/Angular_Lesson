import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;//@ViewChild('') metodu ile formu isimlendirerek onsubmit() metodunda aşağıda ki gibi kullanabiliriz kullanabiliriz ayrıca bu metodta HTMl de  onSubmit() içine f(yani lokal ref yazılmaz)  --> [2]
  defaultQuestion='pet';
  answer='';
  genders= ['male', 'female'];
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form:NgForm) {// [1]
  //   console.log(form);
  // }

  onSubmit(){//--> [2]
    console.log(this.signUpForm)
  }
}
