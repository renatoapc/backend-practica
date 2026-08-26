const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/tasks", taskRoutes);




app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});