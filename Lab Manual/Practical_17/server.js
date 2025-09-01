const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3003;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB (local, default db: tuition_class)
mongoose.connect("mongodb://127.0.0.1:27017/tuition_class", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
	name: String,
	rollNo: String,
	className: String,
});
const Student = mongoose.model("Student", studentSchema);

// Home - List students
app.get("/", async (req, res) => {
	const students = await Student.find();
	res.render("index", { students });
});

// Add student
app.post("/add", async (req, res) => {
	const { name, rollNo, className } = req.body;
	await Student.create({ name, rollNo, className });
	res.redirect("/");
});

// Edit student form
app.get("/edit/:id", async (req, res) => {
	const student = await Student.findById(req.params.id);
	res.render("edit", { student });
});

// Update student
app.post("/edit/:id", async (req, res) => {
	const { name, rollNo, className } = req.body;
	await Student.findByIdAndUpdate(req.params.id, { name, rollNo, className });
	res.redirect("/");
});

// Delete student
app.post("/delete/:id", async (req, res) => {
	await Student.findByIdAndDelete(req.params.id);
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log(`Admin panel running at http://localhost:${PORT}`);
});
