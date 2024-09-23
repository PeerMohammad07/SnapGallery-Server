import IUser, { IUserData } from "./IUser"

export interface IReturnMessage {
  status : boolean,
  message : any ,
  data? : any
}

export default interface IUserUseCase{
  register(data:IUser):Promise<IReturnMessage>
  login(email:string,password:string):Promise<IReturnMessage>
  resetPassword(userId:string,oldPassword:string,newPassword:string):Promise<IReturnMessage>
}