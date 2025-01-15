const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.send("Connected")
})
app.get("/run",(req,res)=>{
    res.send("Hello You are here")
})

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  
  const tempFile = `tempCode.js`;
  const fs = require("fs");
  fs.writeFileSync(tempFile, code);

  exec(`node ${tempFile}`, (err, stdout, stderr) => {
    if (err) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
