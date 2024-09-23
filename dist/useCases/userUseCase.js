"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userUseCase {
    constructor(userRepository, hashingService, jwtService) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async register(data) {
        const userExists = await this.userRepository.checkUserExists(data.email);
        if (userExists) {
            return {
                status: false,
                message: {
                    email: "User already exists with this email"
                }
            };
        }
        if (data.password) {
            data.password = await this.hashingService.hashing(data.password);
        }
        const user = await this.userRepository.createUser(data.name, data.email, data.phone, data.password);
        if (user) {
            return {
                status: true,
                message: "User created successfully",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }
            };
        }
        return {
            status: false,
            message: "Failed to register",
        };
    }
    async login(email, password) {
        const user = await this.userRepository.checkUserExists(email);
        if (!user) {
            return {
                status: false,
                message: {
                    email: "User Not Found"
                }
            };
        }
        const status = await this.hashingService.compare(password, user.password);
        if (!status) {
            return {
                status: false,
                message: {
                    password: "Incorrect Password"
                }
            };
        }
        const payload = { id: user._id, name: user.name };
        const token = this.jwtService.generateToken(payload);
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        return {
            status: true,
            message: "User Login Succesfully",
            data: { token, refreshToken, user }
        };
    }
    async resetPassword(userId, oldPassword, newPassword) {
        const response = await this.userRepository.checkUser(userId);
        if (response === null || response === void 0 ? void 0 : response.password) {
            const passwordCheck = await this.hashingService.compare(oldPassword, response === null || response === void 0 ? void 0 : response.password);
            if (!passwordCheck) {
                return {
                    status: false,
                    message: "Incorrect old Password"
                };
            }
        }
        else {
            return {
                status: false,
                message: "User Not Found"
            };
        }
        const hashPassword = await this.hashingService.hashing(newPassword);
        await this.userRepository.changePassword(userId, hashPassword);
        return {
            status: true,
            message: "Password changed succesfully"
        };
    }
}
exports.default = userUseCase;
