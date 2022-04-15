export class User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;

  constructor(id:string,firstName:string,lastName:string,age:number,email:string) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.age=age;
    this.email=email;
  }
}
