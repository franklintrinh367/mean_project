export class User {
    private fullname: string;
    private username: string;
    private email: string;
    private password: string;
    private confirm: string;

    public get getFullName() { return this.fullname}
    public get getUserName() { return this.username}
    public get getEmail() { return this.email}
    public get getPassword() { return this.password}
    public get getConfirm() { return this.confirm}
}