import expres from "express"
import imageController from "../../adapters/controllers/imageController"
import userRepository from "../../adapters/repositorys/userRepository"
import userSchema from "../model/userSchema"
import imageUseCase from "../../useCases/imageUseCase"
import imageRepository from "../../adapters/repositorys/imageRepository"
import imageSchema from "../model/imageSchema"
import { ImageUpload } from "../middleware/multer"
import userAuth from "../middleware/userAuth"

const imageRouter = expres.Router()

// DependencyInjection
const UserRepository = new userRepository(userSchema)
const ImageRepository = new imageRepository(imageSchema)
const ImageUseCase = new imageUseCase(ImageRepository,UserRepository)
const ImageController = new imageController(ImageUseCase)

imageRouter.post('/changeImageOrder',userAuth,ImageController.updateImageOrder)
imageRouter.post('/upload',userAuth,ImageUpload.array('images',12),ImageController.addImage)
imageRouter.get('/getAllImages',userAuth,ImageController.getAllImagesByUser)
imageRouter.delete('/delete/:imageId/:userId',userAuth,ImageController.deleteImage)
imageRouter.put('/edit',userAuth,ImageUpload.single('image'),ImageController.editImage)


export default imageRouter