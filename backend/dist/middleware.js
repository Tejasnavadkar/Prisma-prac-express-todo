"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./routes/user");
const Authmiddleware = (req, res, next) => {
    const bearertoken = req.headers.authorization;
    if (!bearertoken) {
        res.status(401).json({ msg: "token not found" });
        return;
    }
    const token = bearertoken === null || bearertoken === void 0 ? void 0 : bearertoken.split(" ")[1];
    if (user_1.JWT_Secret) {
        const decode = jsonwebtoken_1.default.verify(token, user_1.JWT_Secret); // Type assertion to indicate the expected structure
        req.email = decode.email; // now we can assign values
        next();
    }
    else {
        res.status(401).json({ msg: "JWT_Secret not found" });
    }
};
exports.Authmiddleware = Authmiddleware;
