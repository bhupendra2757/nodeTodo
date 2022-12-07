import express from "express";
// import todoController from "../controllers/todoController.js";
import todoController from "../controllers/todoController.js"
const router = express.Router();

router.post("", todoController.createTodo );
router.put("/:id", todoController.updateTodo);
router.get("", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.delete("/:id", todoController.deleteTodo);

export default router;