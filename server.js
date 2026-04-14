const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/chat", async (req, res) => {
  try {
    const prompt = req.query.prompt;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.listen(10000, () => console.log("Server running"));
