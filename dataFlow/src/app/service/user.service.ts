import {User} from "../models/user.model"

export class UserService{

  getUsers():User[]{
    return [
      new User("1","John","Doe",18,"john@test.com"),
      new User("2","Barney","Doe",23,"barney@test.com"),
      new User("3","Lucy","Doe",28,"lucy@test.com"),
      new User("4","Alex","Doe",38,"alex@test.com"),
      new User("5","Marie","Doe",488,"marie@test.com"),
    ]

  }
}
