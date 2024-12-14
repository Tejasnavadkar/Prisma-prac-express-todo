"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_Secret = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const zod_1 = require("../zod");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("../middleware");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
exports.JWT_Secret = process.env.SECRET_KEY;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get user credentials from req.body and generate token and create in db
    // in body {email,firstName,lastName,password}
    const userdata = req.body;
    const parserd = zod_1.userSchema.safeParse(userdata);
    if (!parserd.success) {
        res.status(400).json({ msg: "invalid inputs", errors: parserd.error.errors });
        return;
    }
    const isExist = yield prisma.user.findUnique({
        where: {
            email: userdata.email
        }
    });
    if (isExist) {
        res.status(400).json({ msg: "user Already Exist" });
        return;
    }
    const cretedUser = yield prisma.user.create({
        data: {
            email: userdata.email,
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            password: userdata.password
        }
    });
    if (cretedUser) {
        if (!exports.JWT_Secret) {
            throw new Error("SECRET_KEY environment variable is missing.");
        }
        const bearertoken = jsonwebtoken_1.default.sign({ email: cretedUser.email, name: cretedUser.firstName }, exports.JWT_Secret);
        res.status(200).json({
            msg: "user Created Successfully",
            token: bearertoken,
            user: cretedUser
        });
    }
}));
router.get("/getUser", middleware_1.Authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get user with id of user in db
    const user = yield prisma.user.findUnique({
        where: {
            email: req.email
        }
    });
    if (!user) {
        res.status(401).json({ msg: "user not found" });
    }
    res.status(200).json({ user });
}));
exports.default = router;
