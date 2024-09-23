"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class imageRepository {
    constructor(image) {
        this.image = image;
    }
    async createImage(order, image, title, userId) {
        return await this.image.create({
            order,
            image,
            title,
            userId
        });
    }
    async editImage(match, update) {
        return await this.image.findOneAndUpdate(match, { $set: update }, { new: true });
    }
    async deleteImage(imageId, userId) {
        return await this.image.findOneAndDelete({ userId, _id: imageId });
    }
    async getAllImagesByUser(userId) {
        return await this.image.find({ userId });
    }
    async updateImageOrder(bulkWrite) {
        return await this.image.bulkWrite(bulkWrite);
    }
}
exports.default = imageRepository;
