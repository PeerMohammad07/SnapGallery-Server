import { UpdateWriteOpResult } from "mongoose";
import { IUserData } from "./IUser";

export default interface IUserRepository {
  checkUserExists(email : string):Promise<IUserData|null>
  checkUser(userId:string):Promise<IUserData|null>
  createUser(name : string,email:string,phone:number,password:string):Promise<IUserData>
  changePassword(userId:string,newPassword:string):Promise<UpdateWriteOpResult>
} 