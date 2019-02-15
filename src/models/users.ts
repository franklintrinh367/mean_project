export class User {
  public constructor(
    public email: string,
    public password: string,
    public username: string,
    public activated: boolean,
    public role: string,
    public _id?: string
  ) {}
}
