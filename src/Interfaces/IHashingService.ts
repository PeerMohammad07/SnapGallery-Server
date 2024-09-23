// Interface for Hashing Service
export default interface IHashingService {
  hashing(password:string):Promise<string>
  compare(password:string,hashedPassword:string):Promise<boolean>
}