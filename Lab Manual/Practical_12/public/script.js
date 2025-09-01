document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("calcForm");
	const resultDiv = document.getElementById("result");
	const errorDiv = document.getElementById("error");

	form.addEventListener("submit", async function (e) {
		e.preventDefault();
		errorDiv.textContent = "";
		resultDiv.textContent = "";
		const num1 = form.num1.value;
		const num2 = form.num2.value;
		const op = form.operation.value;

		// Validate input
		if (num1 === "" || num2 === "" || isNaN(num1) || isNaN(num2)) {
			errorDiv.textContent = "Please enter valid numbers!";
			return;
		}

		try {
			const res = await fetch("/calculate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ num1, num2, operation: op }),
			});
			const data = await res.json();
			if (data.error) {
				errorDiv.textContent = data.error;
			} else {
				resultDiv.textContent = `Result: ${data.result}`;
			}
		} catch (err) {
			errorDiv.textContent = "Server error. Please try again.";
		}
	});
});
