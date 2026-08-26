
const taskService = require("../services/taskService");

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const createTask = async (req, res) => {
    const text = req.body.text;

    if (!text || text.trim() === "") {
        return res.status(400).json({ message: "El texto es obligatorio" });
    }
    
    const task = await taskService.createTask(text.trim());

    if (!task) {
        return res.status(409).json({ message: "La tarea ya existe" });
    }
    
    res.status(201).json(task);
};

const updateTask = async (req, res) => {
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

    const result = await taskService.updateTask(id, data);

    if (result.error === "DUPLICATE_TASK") {
        return res.status(409).json({ message: "La tarea ya existe" });
    }

    if (result.error === "TASK_NOT_FOUND") {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(result.task);
};

const deleteTask = async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "El id debe ser un número" });
    }

    const wasDeleted = await taskService.deleteTask(id);

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


