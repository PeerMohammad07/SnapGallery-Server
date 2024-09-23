import { BulkWriteResult } from "mongodb"
import IImage, { IMatch } from "./IImage"

export default interface IImageRepository {
  createImage(order:number,image:string,title:string,userId:string):Promise<IImage>
  editImage(match:IMatch,update:any):Promise<IImage|null>
  deleteImage(imageId:string,userId:string):Promise<IImage|null>
  getAllImagesByUser(userId: string): Promise<IImage[]>
  updateImageOrder(bulkWrite:any):Promise<any>

}