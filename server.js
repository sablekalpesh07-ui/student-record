const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const FILE = "messages.json";

// Save message

app.post("/contact", (req, res) => {
    const newMessage = req.body;

    let messages = [];
    if (fs.existsSync(FILE)) {
        messages = JSON.parse(fs.readFileSync(FILE));
    }

    messages.push(newMessage);
    fs.writeFileSync(FILE, JSON.stringify(messages, null, 2));

    res.json({ message: "Saved successfully" });
});

// Get all messages (ADMIN)
app.get("/messages", (req, res) => {
    if (!fs.existsSync(FILE)) return res.json([]);
    const messages = JSON.parse(fs.readFileSync(FILE));
    res.json(messages);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));

    
