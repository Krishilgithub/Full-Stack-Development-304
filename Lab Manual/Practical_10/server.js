const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3004;

app.set("view engine", "ejs");

// Multer setup for uploads
const upload = multer({
	dest: path.join(__dirname, "uploads"),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "text/plain") {
			cb(null, true);
		} else {
			cb(new Error("Only .txt files are allowed!"));
		}
	},
});

// Home page with log viewer form
app.get("/", (req, res) => {
	res.render("index", { log: null, error: null });
});

// Upload log file
app.post("/upload", upload.single("logfile"), (req, res) => {
	if (!req.file) {
		return res.render("index", {
			log: null,
			error: "No file uploaded or invalid file type.",
		});
	}
	res.render("index", {
		log: null,
		error: `File '${req.file.originalname}' uploaded successfully!`,
	});
});

// View log file
app.get("/view", (req, res) => {
	const fileName = req.query.file;
	if (!fileName || !fileName.endsWith(".txt")) {
		return res.render("index", {
			log: null,
			error: "Please enter a valid .txt filename.",
		});
	}
	const filePath = path.join(__dirname, fileName);
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			return res.render("index", {
				log: null,
				error: "Log file not found or inaccessible.",
			});
		}
		res.render("index", { log: data, error: null });
	});
});

app.listen(PORT, () => {
	console.log(`Log viewer running at http://localhost:${PORT}`);
});
