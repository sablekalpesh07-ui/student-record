const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 FIXED PATH (IMPORTANT LINE)
const publicPath = path.join(process.cwd(), "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: publicPath });
});

const FILE = "messages.json";

app.post("/contact", (req, res) => {
    let messages = [];
    if (fs.existsSync(FILE)) {
        messages = JSON.parse(fs.readFileSync(FILE));
    }

    messages.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(messages, null, 2));

    res.json({ message: "Saved successfully" });
});

app.get("/messages", (req, res) => {
    if (!fs.existsSync(FILE)) return res.json([]);
    res.json(JSON.parse(fs.readFileSync(FILE)));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
    
