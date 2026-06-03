const express = require("express");

const app = express();

app.use(express.json());

let tasks = [
    { id: 1, title: "Study Backend" }
];

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET task by id
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

// POST new task
app.post("/tasks", (req, res) => {
    tasks.push(req.body);
    res.status(201).json({
        message: "Task added",
        task: req.body
    });
});

// PUT update task
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title;

    res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);

    res.json({
        message: "Task deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});