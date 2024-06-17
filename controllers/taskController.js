import TaskModel from "../models/TaskModel.js";
import {tasks} from '../data/tasks.js'
const addNewTask = async (req, res) => {
    try {
        const { content } = req.body
        const id = req.uid
        console.log(uid)
        if (!content) {
            throw new Error('missing content')
        }
        const newTask = new TaskModel({
            content,
            createdBy: id,
        })

        await newTask.save()

        res.status(200).send({
            message: 'Task created successfully',
            data: newTask
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const getTasks = async (req, res) => {
    const id = req.uid;
    try {
        // const tasks = await TaskModel.find({ createdBy: id });
        res.status(200).json({
            message: 'task',
            data:tasks
        })
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
}

const updateTask = async (req, res) => {
    const { id } = req.query
    const { content } = req.body
    await TaskModel.findByIdAndUpdate(id, { content })
    res.status(203).json({
        message: 'updated',
        data:[]
    })
}

const deleteTask = async (req, res) => {
    const { id } = req.query
    await TaskModel.findByIdAndDelete(id)

    res.status(205).json({
        message: 'deleted',
        data:[]
    })
}

export { addNewTask, getTasks, updateTask, deleteTask };