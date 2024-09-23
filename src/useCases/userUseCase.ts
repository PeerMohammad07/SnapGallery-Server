import IHashingService from "../Interfaces/IHashingService";
import IjwtService from "../Interfaces/IJwtService";
import IUser, { IUserData } from "../Interfaces/IUser";
import IUserRepository from "../Interfaces/IUserRepository";
import IUserUseCase from "../Interfaces/IUserUseCase";

export default class userUseCase implements IUserUseCase {
  private userRepository: IUserRepository
  private hashingService: IHashingService
  private jwtService: IjwtService

  constructor(userRepository: IUserRepository, hashingService: IHashingService, jwtService: IjwtService) {
    this.userRepository = userRepository
    this.hashingService = hashingService
    this.jwtService = jwtService
  }

  async register(data: IUser) {
    const userExists = await this.userRepository.checkUserExists(data.email)
    if (userExists) {
      return {
        status: false,
        message: {
          email : "User already exists with this email"
        }
      }
    }

    if (data.password) {
      data.password = await this.hashingService.hashing(data.password)
    }

    const user = await this.userRepository.createUser(data.name, data.email, data.phone, data.password)
    if (user) {
      return {
        status: true,
        message: "User created successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        }
      }
    }

    return {
      status: false,
      message: "Failed to register",
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.checkUserExists(email)
    if (!user) {
      return {
        status: false,
        message: {
          email: "User Not Found"
        }
      }
    }

    const status = await this.hashingService.compare(password, user.password)
    if (!status) {
      return {
        status: false,
        message: {
          password: "Incorrect Password"
        }
      }
    }

    const payload = { id: user._id, name: user.name }
    const token = this.jwtService.generateToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)
    return {
      status: true,
      message: "User Login Succesfully",
      data: { token, refreshToken, user }
    }
  }

  async resetPassword(userId:string,oldPassword:string,newPassword:string){
    const response = await this.userRepository.checkUser(userId)
    if (response?.password) {
      const passwordCheck = await this.hashingService.compare(oldPassword, response?.password)
      if (!passwordCheck) {
        return {
          status : false,
          message : "Incorrect old Password"
        }
      }
    }else{
      return {
        status : false,
        message : "User Not Found"
      }
    }

    const hashPassword = await this.hashingService.hashing(newPassword)
    await this.userRepository.changePassword(userId,hashPassword)
    return {
      status : true,
      message : "Password changed succesfully"
    }
  }
}