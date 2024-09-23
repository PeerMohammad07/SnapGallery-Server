import { Request, Response } from "express"
import IUserUseCase from "../../Interfaces/IUserUseCase"

export default class userController {
  private userUseCase : IUserUseCase

  constructor(userUseCase:IUserUseCase){
    this.userUseCase = userUseCase
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  async register(req:Request<any>,res:Response<any>){
    try {
      const {name , phone , email , password}  = req.body
      const response = await this.userUseCase.register({name,email,phone,password})
      if(!response.status){       
       return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async login(req:Request<any>,res:Response<any>){
    try {
      const {email,password} = req.body
      const response = await this.userUseCase.login(email,password)
      if(!response?.status){       
        res.status(401).json(response)
      }
      res.cookie("userToken",response.data.token,{ httpOnly: true, maxAge: 3600000 , secure : process.env.NODE_ENV != "development" })
      res.cookie("userRefreshToken",response.data.refreshToken,{ httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000,secure : process.env.NODE_ENV != "development" })
      res.status(200).json({status:true,message:response.message,data:response.data.user})
    } catch (error) {
      console.log(error)
    }
  }

  async logout(req:Request<any>,res:Response<any>) {
    try {
      res.cookie("userToken","")
      res.cookie("userRefreshToken","")
      res.status(200).json({status:true,message:"User logout successfully"})
    } catch (error) {
      console.log(error)
    }
  }

  async resetPassword(req:Request<any>,res:Response<any>){
    try {
      const {userId,oldPassword , newPassword} = req.body
      const response = await this.userUseCase.resetPassword(userId,oldPassword,newPassword)
      if(!response?.status){       
       return res.status(401).json(response)
      }
      res.status(200).json(response)
     } catch (error) {
      console.log(error)
    }
  }
}