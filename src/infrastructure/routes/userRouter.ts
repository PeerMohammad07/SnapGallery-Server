import expres from "express"
import userController from "../../adapters/controllers/userController"
import userUseCase from "../../useCases/userUseCase"
import userRepository from "../../adapters/repositorys/userRepository"
import jwtService from "../utils/jwtService"
import HashingService from "../utils/hashingService"
import userSchema from "../model/userSchema"

const userRouter = expres.Router()

// Dependency Injection 

const hashingService = new HashingService()
const JwtService = new jwtService()
const UserRepository = new userRepository(userSchema)
const UserUseCase = new userUseCase(UserRepository,hashingService,JwtService)
const UserController = new userController(UserUseCase)


userRouter.get("/test",(req,res)=>{
  res.send("Server is running Successfully")
})

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.post('/logout',UserController.logout)
userRouter.post('/resetPassword',UserController.resetPassword)

export default userRouter