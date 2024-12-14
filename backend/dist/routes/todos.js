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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middleware_1 = require("../middleware");
const zod_1 = require("../zod");
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
router.post("/createTodo", middleware_1.Authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get todo from req.body and crete in db
    const todobody = req.body;
    const parsed = zod_1.todoSchema.safeParse(todobody);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid todo credentials", errors: parsed.error.errors });
        return;
    }
    const createdTodo = yield Prisma.todo.create({
        data: {
            title: todobody.title,
            description: todobody.description,
            // done:todobody.done,
            user_id: todobody.user_id
        }
    });
    if (!createdTodo) {
        res.status(400).json({ msg: "unable to creat todo" });
        return;
    }
    res.status(200).json({ msg: "todo creted successfully" });
}));
//------------------------------------------------------------------------
router.get("/getTodos", middleware_1.Authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all todos of user in db
    const user_id = parseInt(req.query.user_id);
    console.log("user_Id------", user_id);
    if (!user_id) {
        res.status(400).json({ msg: "user_id is required" });
        return;
    }
    // const userId =parseInt(user_id)
    if (typeof user_id !== 'number') {
        res.status(400).json({ msg: "user_id must be a number" });
        return;
    }
    // Convert to a number (if necessary) or leave as string
    // const userIdNumber = parseInt(user_id, 10);
    // if (isNaN(userIdNumber)) {
    //     return res.status(400).json({ msg: "Invalid user_id" });
    // }
    const allTodos = yield Prisma.todo.findMany({
        where: {
            user_id: user_id
        }
    });
    if (!allTodos) {
        res.status(401).json({ msg: "post not found" });
        return;
    }
    res.status(200).json({ allTodos });
}));
exports.default = router;
