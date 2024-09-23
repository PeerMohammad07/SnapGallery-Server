export default interface IjwtService {
  generateToken(data : any):string
  generateRefreshToken(data:any):string
  verifyToken(token: string): any
  verifyRefreshToken(token: string): any
}