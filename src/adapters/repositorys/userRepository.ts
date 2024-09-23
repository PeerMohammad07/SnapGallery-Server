import { Model } from "mongoose";
import IUser from "../../Interfaces/IUser";
import IUserRepository from "../../Interfaces/IUserRepository";

class userRepository implements IUserRepository {
  private user: Model<IUser>

  constructor(user: Model<IUser>) {
    this.user = user
  }

  async checkUserExists(email: string) {
    return await this.user.findOne({ email: email })
  }

  async createUser(name: string, email: string, phone: number, password: string) {
    const user = await new this.user({
      name: name,
      email: email,
      phone: phone,
      password: password
    })
    return await user.save()
  }

  async changePassword(userId:string,newPassword:string) {
    return this.user.updateOne({_id:userId},{$set:{password:newPassword}})
  }

  async checkUser(userId:string){
    return this.user.findOne({_id:userId})
  }

}

export default userRepository