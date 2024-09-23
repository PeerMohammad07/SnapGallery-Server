import bcrypt from "bcrypt"
import IHashingService from "../../Interfaces/IHashingService"

export default class HashingService implements IHashingService{

  // Password Hashing
  async hashing(password : string){    
    return await bcrypt.hash(password,10)
  }

  // Password comparing
  async compare(password:string,hashedPassword:string){
    try {      
      return await bcrypt.compare(password,hashedPassword)
    } catch (error) {
      throw new Error("Failed to compare password")
    }
  }
}