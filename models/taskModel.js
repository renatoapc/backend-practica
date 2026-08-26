const pool = require("../config/db");

const getAllTasks = async () => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");

    return result.rows;
};

const createTask = async (text) => {
    const result = await pool.query(
        "INSERT INTO tasks (text) VALUES ($1) RETURNING *",
        [text]
    );

    return result.rows[0];
};

const findTaskById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const updateTask = async (id, data) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.text !== undefined) {
        fields.push(`text = $${paramIndex}`);
        values.push(data.text);
        paramIndex++;
    }

    if (data.done !== undefined) {
        fields.push(`done = $${paramIndex}`);
        values.push(data.done);
        paramIndex++;
    }

    if (fields.length === 0) {
        return findTaskById(id);
    }

    values.push(id);

    const result = await pool.query(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
        values
    );

    return result.rows[0];
};

const deleteTask = async (id) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rowCount > 0;
};

module.exports = {
    getAllTasks,
    createTask,
    findTaskById,
    updateTask,
    deleteTask
};