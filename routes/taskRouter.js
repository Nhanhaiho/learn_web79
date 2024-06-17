import { Router } from "express";
import { addNewTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import logger from "../middlewares/logger.js";
import verifyToken from "../middlewares/verifyToken.js"
// import TaskModel from "../models/TaskModel.js";
const taskRouter = Router();

// còn nếu muốn mỗi api đều có middleware logger thì mình sẽ làm như sau
// taskRouter.use(logger);
taskRouter.use(verifyToken)


taskRouter.post('/add-new-task', addNewTask)
taskRouter.get("/get-task", getTasks);
taskRouter.put('/update-task', updateTask)
taskRouter.delete('/delete-task', deleteTask)




export default taskRouter;
