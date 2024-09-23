import { Request, Response } from "express";
import IImageUseCase from "../../Interfaces/IImageUseCase";

export default class imageController{

  private imageUseCase : IImageUseCase

  constructor(imageUseCase:IImageUseCase){
    this.imageUseCase = imageUseCase
    this.addImage = this.addImage.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.getAllImagesByUser = this.getAllImagesByUser.bind(this)
    this.updateImageOrder = this.updateImageOrder.bind(this)
  }

  async addImage(req:Request<any>,res:Response<any>){
    try {
      const {titles,userId} = req.body
      const parsedTitles = JSON.parse(titles)
      const images = req.files
      const response = await this.imageUseCase.addImage(userId,images,parsedTitles)
      if(!response.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async editImage(req:Request<any>,res:Response<any>){
    try {
      const {title,userId,imageId} = req.body
      const imageFile = req.file ? req.file : null
      const response = await this.imageUseCase.editImage(imageId,userId,title,imageFile)
      if(!response.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteImage(req:Request<any>,res:Response<any>){
    try {
      const userId = req.params.userId
      const imageId = req.params.imageId
      const response = await this.imageUseCase.deleteImage(userId,imageId)
      if(!response.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async getAllImagesByUser(req:Request<any>,res:Response<any>){
    try {
      const userId = req.query.userId as any
      const response = await this.imageUseCase.getAllImagesByUser(userId)
      if(!response.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async updateImageOrder(req:Request<any>,res:Response<any>){
    try {
      const {updatedImages} = req.body
      const response = await this.imageUseCase.updateImageOrder(updatedImages)
      if(!response.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}