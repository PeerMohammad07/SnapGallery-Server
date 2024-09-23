"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../adapters/controllers/userController"));
const userUseCase_1 = __importDefault(require("../../useCases/userUseCase"));
const userRepository_1 = __importDefault(require("../../adapters/repositorys/userRepository"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const hashingService_1 = __importDefault(require("../utils/hashingService"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const userRouter = express_1.default.Router();
// Dependency Injection 
const hashingService = new hashingService_1.default();
const JwtService = new jwtService_1.default();
const UserRepository = new userRepository_1.default(userSchema_1.default);
const UserUseCase = new userUseCase_1.default(UserRepository, hashingService, JwtService);
const UserController = new userController_1.default(UserUseCase);
userRouter.get("/test", (req, res) => {
    res.send("Server is running Successfully");
});
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/resetPassword', UserController.resetPassword);
exports.default = userRouter;
