const taskModel = require("../models/taskModel");

const getAllTasks = async (userId) => {
    const tasks = await taskModel.getAllTasks(userId);

    return tasks;
};

const createTask = async (text, userId) => {
    const tasks = await taskModel.getAllTasks(userId);

    const taskAlreadyExists = tasks.some(currentTask => currentTask.text === text);

    if (taskAlreadyExists) {
        return null;
    }

    const task = await taskModel.createTask(text, userId);

    return task;
};

const updateTask = async (id, data, userId) => {
    const existingTask = await taskModel.findTaskById(id, userId);

    if (!existingTask) {
        return { error: "TASK_NOT_FOUND" };
    }
    
    if (data.text !== undefined) {
        const tasks = await taskModel.getAllTasks(userId);

        const taskAlreadyExists = tasks.some(currentTask => {
            return currentTask.text === data.text && currentTask.id !== id;
        });

        if (taskAlreadyExists) {
            return { error: "DUPLICATE_TASK" };
        }
    }

    const updatedTask = await taskModel.updateTask(id, data, userId);

    return { task: updatedTask };
};

const deleteTask = async (id, userId) => {
    const wasDeleted = await taskModel.deleteTask(id, userId); 
    
    return wasDeleted;
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};