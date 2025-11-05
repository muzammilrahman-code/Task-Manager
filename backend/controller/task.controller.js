import {User} from '../model/user.js'
import {Task} from '../model/task.js'

export const createTask = async (req, res) =>{
    try {
        const {title, desc} = req.body;
        const {id} = req.headers;

        const newTask = new Task({title: title, desc: desc})
        const saveTask = await newTask.save();

        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push: {tasks: taskId._id}})

        res.status(200).json({message: "Task Created"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAllTask = async (req, res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: {sort: {createdAt: -1}}
        })
        res.status(200).json({ data: userData});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteTask = async ( req, res) =>{
    try {
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id}})
        res.status(200).json({ message: "Task deleted successfully"});

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const updateTask = async(req, res) =>{
    try {
        const {id} = req.params;
        const {title, desc} = req.body;
        await Task.findByIdAndUpdate(id, {title: title, desc: desc})
        res.status(200).json({message: "Task updated successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateImpTask = async(req, res) =>{
    try {
        const {id} = req.params;
        const taskData = await Task.findById(id);
        const impTask = taskData.important;
        await Task.findByIdAndUpdate(id, { important: !impTask})
        res.status(200).json({message: "Task updated successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCompleteTask = async(req, res) =>{
    try {
        const {id} = req.params;
        const taskData = await Task.findById(id);
        const completeTask = taskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !completeTask})
        res.status(200).json({message: "Task updated successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getImpTask = async (req, res) =>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {important: true},
            options: {sort: {createdAt: -1}}
        })
        const impTaskData = data.tasks;
        res.status(200).json({ data: impTaskData});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCompleteTask = async (req, res) =>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {complete: true},
            options: {sort: {createdAt: -1}}
        })
        const compTaskData = data.tasks;
        res.status(200).json({ data: compTaskData});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getIncompleteTask = async (req, res) =>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {complete: false},
            options: {sort: {createdAt: -1}}
        })
        const compTaskData = data.tasks;
        res.status(200).json({ data: compTaskData});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}