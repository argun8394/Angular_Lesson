import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signUpForm:FormGroup;
  forbiddenUsernames=['Anna', 'Chris'];

  ngOnInit() {
    this.signUpForm= new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null,[Validators.required, Validators.email],this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies':new FormArray([])
    });
    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })
    this.signUpForm.statusChanges.subscribe((status) => {
      console.log(status)
    });
    // this.signUpForm.setValue({
    //   'userData':{
    //     'username':'argun',
    //     'email':'argun@gmail.com',
    //   },
    //   'gender':'male',
    //   'hobbies':[]
    // });
    this.signUpForm.patchValue({
      'userData':{
        'username':'argun',
      }
    })

  }

  onSubmit(){
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'namesIsForbidden' : true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true});
        } else {
          resolve(null)
        }
      },2000)
    });
    return promise;
  }

}
