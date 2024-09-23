import cloudinary from "../infrastructure/utils/cloudinary";
import IImageRepository from "../Interfaces/IImageRepository";
import IImageUseCase from "../Interfaces/IImageUseCase";
import IUserRepository from "../Interfaces/IUserRepository";
import fs from "fs"

export default class imageUseCase implements IImageUseCase {

  private imageRepository: IImageRepository
  private userRepository: IUserRepository

  constructor(imageRepository: IImageRepository, userRepository: IUserRepository) {
    this.imageRepository = imageRepository
    this.userRepository = userRepository
  }

  async addImage(userId: string, image: any, title: string[]) {
    try {
      const checkUserExists = await this.userRepository.checkUser(userId)
      if(!checkUserExists){
        return {
          status : false,
          message : "User Not Found"
        }
      }

      const ImageLinkArray = await Promise.all(image.map(async (img:any)=>{
        const fileImage = await cloudinary.uploader.upload(img.path,{
          folder : "SnapGallery"
        })
        return fileImage.secure_url
      }))

      image.forEach((img:any)=>{
        fs.unlinkSync(img.path);
      })

      const allOrders = await this.imageRepository.getAllImagesByUser(userId)
      const nextOrder = allOrders.length ? allOrders[allOrders.length-1].order + 1 : 1

      const updatedImages = await Promise.all(ImageLinkArray.map(async (imageLink,index)=>{
        const response = await this.imageRepository.createImage(nextOrder+index,imageLink,title[index],userId)
        return response
      }))

      if(!updatedImages){
        return {
          status : false,
          message : "Failed to add images"
        }
      }

      return {status:true,message : "Successfully created iamges",data:updatedImages}
    } catch (error) {
      console.log(error)
      return {
        status: false,
        message: "something went wrong"
      }
    }
  }

  async deleteImage(userId: string, imageId: string) {
    try {
      const userExists = await this.userRepository.checkUser(userId)
      if (!userExists) {
        return {
          status: false,
          message: "Something went wrong , this user is deleted"
        }
      }
      const response = await this.imageRepository.deleteImage(imageId, userId)
      if (response) {
        return {
          status: true,
          data: response,
          message: "Successfully deleted image"
        }
      }
      return { status: false, message: "failed to delete image" }
    } catch (error) {
      console.log(error)
      return {
        status: false,
        message: "Something went wrong"
      }
    }
  }


  async editImage(imageId: string, userId: string, title: string, image: any) {
    try {
      const checkUserExists = await this.userRepository.checkUser(userId)
      const update:any = {}
      if(!checkUserExists){
        return {
          status : false,
          message : "User Not Found"
        }
      }

      if(image){
        const fileImage = await cloudinary.uploader.upload(image.path,{
          folder : "SnapGallery"
        })
        fs.unlinkSync(image.path)
        update.image = fileImage.secure_url
      }

      update.title = title
      const match = {_id:imageId,userId}
      const response = await this.imageRepository.editImage(match,update)
      console.log(response,"edited Images")
      if(response){
        return {
          status : true,
          data : response,
          message : "Successfully eited image"
        }
      }
      return {status : false , message : "Failed to edit Image"}
    } catch (error) {
      console.log(error)
      return {status:false , message : "Something went wrong"}
    }
  }

  async getAllImagesByUser(userId: string) {
    try {
      const response = await this.imageRepository.getAllImagesByUser(userId)
      if (response) {
        return {
          status: true,
          data: response,
          message: "Got all images"
        }
      }
      return { status: false, message: "failed to get the images" }
    } catch (error) {
      console.log(error)
      return {
        status: false,
        message: "something went wrong"
      }
    }
  }

  async updateImageOrder(updateImages : any){
    try {
      const bulkWrite = updateImages.map((image:any)=>({
        updateOne : {
          filter : {_id : image._id},
          update : {order : image.order}
        }
      }))

      const response = this.imageRepository.updateImageOrder(bulkWrite)
      if(!response){
        return {
          status : false,
          message : "Failed to change image order"
        }
      }
      return {status : true, message : "Succesfully image order"}
    } catch (error) {
      console.log(error)
      return {
        status : false,
        message : "Something went wrong"
      }
    }
  }
}