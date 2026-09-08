const pool = require("../config/db");

const getAllTasks = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC",
        [userId]
    );

    return result.rows;
};

const createTask = async (text, userId) => {
    const result = await pool.query(
        "INSERT INTO tasks (text, user_id) VALUES ($1, $2) RETURNING *",
        [text, userId]
    );

    return result.rows[0];
};

const findTaskById = async (id, userId) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
        [id, userId]
    );

    return result.rows[0];
};

const updateTask = async (id, data, userId) => {
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
        return findTaskById(id, userId);
    }

    values.push(id);
    values.push(userId);

    const result = await pool.query(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} RETURNING *`,
        values
    );

    return result.rows[0];
};

const deleteTask = async (id, userId) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
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