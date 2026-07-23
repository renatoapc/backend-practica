let tasks = [];

const getAllTasks = () => {
    return tasks;
};

const createTask = (text) => {
    const task = {
        id: Date.now(),
        text,
        done: false
    };

    tasks.push(task);
    return task;
};

const findTaskById = (id) => {
    return tasks.find(currentTask => currentTask.id === id);
};

const updateTask = (id, data) => {
    const task = findTaskById(id);

    if (!task) {
        return null;
    }

    if (data.text !== undefined) {
        task.text = data.text;
    }

    if (data.done !== undefined) {
        task.done = data.done;
    }

    return task;
};

const deleteTask = (id) => {
    const task = findTaskById(id);

    if (!task) {
        return false;
    }

    tasks = tasks.filter(currentTask => currentTask.id !== id);
    return true;
};

module.exports = {
    getAllTasks,
    createTask,
    findTaskById,
    updateTask,
    deleteTask
};