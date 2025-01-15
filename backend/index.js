const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require('child_process'); 
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  example: { type: String }, 
});

// Create the model
const Problem = mongoose.model('Problem', problemSchema);

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const dbURL = "mongodb://localhost:27017/kmuttGame";
mongoose
  .connect(dbURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
app.get("/api/problems", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch problems", details: error });
  }
});
app.post('/execute', (req, res) => {
  const { code } = req.body; // รับโค้ดจาก Frontend
  const fileName = 'temp.js'; // ไฟล์ที่จะใช้สำหรับรันโค้ด

  // เขียนโค้ดไปที่ไฟล์ชั่วคราว
  const fs = require('fs');
  fs.writeFileSync(fileName, code);

  // รันโค้ดที่เขียนด้วย Node.js
  exec(`node ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      return res.json({ output: `Error: ${stderr || error.message}` });
    }
    res.json({ output: stdout });
  });
});

app.post("/api/problems", async (req, res) => {
  const { title, description, difficulty, examples } = req.body;

  try {
    const problem = new Problem({ title, description, difficulty, examples });
    await problem.save();
    res.status(201).json({ message: "Problem added successfully", problem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add problem", details: error });
  }
});

// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
