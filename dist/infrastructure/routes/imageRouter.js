"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = __importDefault(require("../../adapters/controllers/imageController"));
const userRepository_1 = __importDefault(require("../../adapters/repositorys/userRepository"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const imageUseCase_1 = __importDefault(require("../../useCases/imageUseCase"));
const imageRepository_1 = __importDefault(require("../../adapters/repositorys/imageRepository"));
const imageSchema_1 = __importDefault(require("../model/imageSchema"));
const multer_1 = require("../middleware/multer");
const userAuth_1 = __importDefault(require("../middleware/userAuth"));
const imageRouter = express_1.default.Router();
// DependencyInjection
const UserRepository = new userRepository_1.default(userSchema_1.default);
const ImageRepository = new imageRepository_1.default(imageSchema_1.default);
const ImageUseCase = new imageUseCase_1.default(ImageRepository, UserRepository);
const ImageController = new imageController_1.default(ImageUseCase);
imageRouter.post('/changeImageOrder', userAuth_1.default, ImageController.updateImageOrder);
imageRouter.post('/upload', userAuth_1.default, multer_1.ImageUpload.array('images', 12), ImageController.addImage);
imageRouter.get('/getAllImages', userAuth_1.default, ImageController.getAllImagesByUser);
imageRouter.delete('/delete/:imageId/:userId', userAuth_1.default, ImageController.deleteImage);
imageRouter.put('/edit', userAuth_1.default, multer_1.ImageUpload.single('image'), ImageController.editImage);
exports.default = imageRouter;
