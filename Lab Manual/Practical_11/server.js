const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use("/public", express.static(__dirname + "/public"));

// /home route for dashboard
app.get("/home", (req, res) => {
	res.sendFile(__dirname + "/public/dashboard.html");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
