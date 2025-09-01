const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Serve calculator page
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

// Calculator logic
app.post("/calculate", (req, res) => {
	const { num1, num2, operation } = req.body;
	let n1 = parseFloat(num1);
	let n2 = parseFloat(num2);

	if (isNaN(n1) || isNaN(n2)) {
		return res.json({ error: "Please enter valid numbers!" });
	}

	let result;
	switch (operation) {
		case "add":
			result = n1 + n2;
			break;
		case "subtract":
			result = n1 - n2;
			break;
		case "multiply":
			result = n1 * n2;
			break;
		case "divide":
			if (n2 === 0) {
				return res.json({ error: "Cannot divide by zero!" });
			}
			result = n1 / n2;
			break;
		default:
			return res.json({ error: "Invalid operation!" });
	}
	res.json({ result });
});

app.listen(PORT, () => {
	console.log(`Kids Calculator running at http://localhost:${PORT}`);
});
