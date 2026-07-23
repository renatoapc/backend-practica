const taskModel = require("../models/taskModel");

const getTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();

    res.json(tasks);
};

const createTask = (req, res) => {
    const text = req.body.text;

    if (!text || text.trim() === "") {
        return res.status(400).json({ message: "El texto es obligatorio" });
    }
    
    const task = taskModel.createTask(text.trim());
    
    res.status(201).json(task);
};

const updateTask = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "El id debe ser un número" });
    }

    const data = {};

    if (req.body.text !== undefined) {
        const text = req.body.text;

        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "El texto es obligatorio" });
        }

        data.text = text.trim();
    }

    if (req.body.done !== undefined) {
        if (typeof req.body.done !== "boolean") {
            return res.status(400).json({ message: "done debe ser booleano" });
        }

        data.done = req.body.done;
    }

    const updatedTask = taskModel.updateTask(id, data);

    if (!updatedTask) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(updatedTask);
};

const deleteTask = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "El id debe ser un número" });
    }

    const wasDeleted = taskModel.deleteTask(id);

    if (!wasDeleted) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
