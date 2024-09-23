import { Model } from "mongoose";
import IImage, { IMatch } from "../../Interfaces/IImage";
import IImageRepository from "../../Interfaces/IImageRepository";

export default class imageRepository implements IImageRepository{
  private image : Model<IImage>

  constructor(image:Model<IImage>){
    this.image = image
  }

  async createImage(order:number,image:string,title:string,userId:string){
    return await this.image.create({
      order,
      image,
      title,
      userId
    })
  }

  async editImage(match:IMatch,update:any){
    return await this.image.findOneAndUpdate(match,{$set:update},{new : true})
  }

  async deleteImage(imageId:string,userId:string){
    return await this.image.findOneAndDelete({userId,_id:imageId})
  }

  async getAllImagesByUser(userId:string){
    return await this.image.find({userId})
  }

  async updateImageOrder(bulkWrite:any){
    return await this.image.bulkWrite(bulkWrite)
  }

}