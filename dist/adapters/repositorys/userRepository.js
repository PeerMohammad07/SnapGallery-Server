"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userRepository {
    constructor(user) {
        this.user = user;
    }
    async checkUserExists(email) {
        return await this.user.findOne({ email: email });
    }
    async createUser(name, email, phone, password) {
        const user = await new this.user({
            name: name,
            email: email,
            phone: phone,
            password: password
        });
        return await user.save();
    }
    async changePassword(userId, newPassword) {
        return this.user.updateOne({ _id: userId }, { $set: { password: newPassword } });
    }
    async checkUser(userId) {
        return this.user.findOne({ _id: userId });
    }
}
exports.default = userRepository;
