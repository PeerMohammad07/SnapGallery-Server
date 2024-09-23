import { IReturnMessage } from "./IUserUseCase";

export default interface IImageUseCase {
  addImage(userId: string, image: any , title: string[]): Promise<IReturnMessage>;
  deleteImage(userId: string, imageId: string): Promise<IReturnMessage>;
  editImage(imageId: string, userId: string, title: string, image: any): Promise<IReturnMessage>;
  getAllImagesByUser(userId:string):Promise<IReturnMessage>
  updateImageOrder(updateImages : any):Promise<IReturnMessage>
}