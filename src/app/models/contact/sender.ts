
export class Sender {

  public constructor(public name?: string, public email?: string) { }

  public isSameUser(user: Sender) {
    return user ? JSON.stringify(user) === JSON.stringify(this) : false
  }
}