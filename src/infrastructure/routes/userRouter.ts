import expres from "express"

const userRouter = expres.Router()

userRouter.get("/test",(req,res)=>{
  res.send("Server is running Successfully")
})

export default userRouter