const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "application/pdf") {
		cb(null, true);
	} else {
		cb(new Error("Only PDF files are allowed!"), false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
	fileFilter: fileFilter,
}).single("resume");

app.post("/upload", (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			let message = err.message || "File upload error.";
			return res.status(400).json({ success: false, message });
		}
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: "No file uploaded." });
		}
		res.json({ success: true, message: "Resume uploaded successfully!" });
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
