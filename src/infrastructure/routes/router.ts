import expres from "express"
import imageRouter from "./imageRouter"
import userRouter from "./userRouter"

const router = expres.Router()

router.use("/image",imageRouter)
router.use("/user",userRouter)

export default router