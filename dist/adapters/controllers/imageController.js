"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class imageController {
    constructor(imageUseCase) {
        this.imageUseCase = imageUseCase;
        this.addImage = this.addImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.editImage = this.editImage.bind(this);
        this.getAllImagesByUser = this.getAllImagesByUser.bind(this);
        this.updateImageOrder = this.updateImageOrder.bind(this);
    }
    async addImage(req, res) {
        try {
            const { titles, userId } = req.body;
            const parsedTitles = JSON.parse(titles);
            const images = req.files;
            const response = await this.imageUseCase.addImage(userId, images, parsedTitles);
            if (!response.status) {
                return res.status(401).json(response);
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async editImage(req, res) {
        try {
            const { title, userId, imageId } = req.body;
            const imageFile = req.file ? req.file : null;
            const response = await this.imageUseCase.editImage(imageId, userId, title, imageFile);
            if (!response.status) {
                return res.status(401).json(response);
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteImage(req, res) {
        try {
            const userId = req.params.userId;
            const imageId = req.params.imageId;
            const response = await this.imageUseCase.deleteImage(userId, imageId);
            if (!response.status) {
                return res.status(401).json(response);
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllImagesByUser(req, res) {
        try {
            const userId = req.query.userId;
            const response = await this.imageUseCase.getAllImagesByUser(userId);
            if (!response.status) {
                return res.status(401).json(response);
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateImageOrder(req, res) {
        try {
            const { updatedImages } = req.body;
            const response = await this.imageUseCase.updateImageOrder(updatedImages);
            if (!response.status) {
                return res.status(401).json(response);
            }
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = imageController;
