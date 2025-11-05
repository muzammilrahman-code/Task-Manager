import express from 'express'
import {createTask} from '../controller/task.controller.js'
import {getAllTask} from '../controller/task.controller.js'
import {deleteTask} from '../controller/task.controller.js'
import {updateTask} from '../controller/task.controller.js'
import {updateImpTask} from '../controller/task.controller.js'
import {updateCompleteTask} from '../controller/task.controller.js'
import {getImpTask} from '../controller/task.controller.js'
import {getCompleteTask} from '../controller/task.controller.js'
import {getIncompleteTask} from '../controller/task.controller.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post("/create-task", verifyToken, createTask)
router.get("/get-all-task", verifyToken, getAllTask)
router.delete("/delete-task/:id", verifyToken, deleteTask)
router.put("/update-task/:id", verifyToken, updateTask)
router.put("/update-imp-task/:id", verifyToken, updateImpTask)
router.put("/update-complete-task/:id", verifyToken, updateCompleteTask)
router.get("/get-imp-task/", verifyToken, getImpTask)
router.get("/get-comp-task/", verifyToken, getCompleteTask)
router.get("/get-incomp-task/", verifyToken, getIncompleteTask)



export default router;