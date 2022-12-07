import express from "express";
import todoController from "../controllers/todoController.js"
const router = express.Router();

const todoController = new todoController();

router.post("", todoController.creteTodo);
router.put("/:id", todoController.updateTodo);
router.get("", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.delete("/:id", todoController.deleteTodo);

export default router;