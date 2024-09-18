import expres from "express"

const imageRouter = expres.Router()

imageRouter.get("/test",(req,res)=>{
  res.send("Server is running Successfully")
})

export default imageRouter