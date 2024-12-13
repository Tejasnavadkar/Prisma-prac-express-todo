"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    email: zod_1.default.string().email().trim(),
    firstName: zod_1.default.string().min(3).trim(),
    lastName: zod_1.default.string().min(3).trim(),
    password: zod_1.default.string().trim()
});
exports.todoSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    done: zod_1.default.boolean().optional()
});
