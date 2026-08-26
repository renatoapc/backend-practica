const taskModel = require("../models/taskModel");

const getAllTasks = async () => {
    const tasks = await taskModel.getAllTasks();

    return tasks;
};

const createTask = async (text) => {
    const tasks = await taskModel.getAllTasks();

    const taskAlreadyExists = tasks.some(currentTask => currentTask.text === text);

    if (taskAlreadyExists) {
        return null;
    }

    const task = await taskModel.createTask(text);

    return task;
};

const updateTask = async (id, data) => {
    const existingTask = await taskModel.findTaskById(id);

    if (!existingTask) {
        return { error: "TASK_NOT_FOUND" };
    }
    
    if (data.text !== undefined) {
        const tasks = await taskModel.getAllTasks();

        const taskAlreadyExists = tasks.some(currentTask => {
            return currentTask.text === data.text && currentTask.id !== id;
        });

        if (taskAlreadyExists) {
            return { error: "DUPLICATE_TASK" };
        }
    }

    const updatedTask = await taskModel.updateTask(id, data);

    return { task: updatedTask };
};

const deleteTask = async (id) => {
    const wasDeleted = await taskModel.deleteTask(id); 
    
    return wasDeleted;
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};