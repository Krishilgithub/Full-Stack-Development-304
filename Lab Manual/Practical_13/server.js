const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3005;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Show tax form
app.get("/", (req, res) => {
	res.render("form", { error: null });
});

// Handle form submission and show result
app.post("/total", (req, res) => {
	const { income1, income2 } = req.body;
	let n1 = parseFloat(income1);
	let n2 = parseFloat(income2);

	if (isNaN(n1) || isNaN(n2) || income1 === "" || income2 === "") {
		return res.render("form", {
			error: "Please enter valid numbers for both income sources!",
		});
	}

	const total = n1 + n2;
	res.render("result", { total });
});

app.listen(PORT, () => {
	console.log(`Tax Form app running at http://localhost:${PORT}`);
});
