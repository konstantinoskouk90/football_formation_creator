export class CreatePlayer {

  constructor(public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public homeNumber: number,
    public mobileNumber: number,
    public dateOfBirth: Date,
    public position: string,
    public footedness: string
  ) { }
}