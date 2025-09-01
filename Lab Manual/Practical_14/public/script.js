document
	.getElementById("uploadForm")
	.addEventListener("submit", async function (e) {
		e.preventDefault();
		const form = e.target;
		const fileInput = document.getElementById("resume");
		const messageDiv = document.getElementById("message");
		messageDiv.textContent = "";

		if (!fileInput.files.length) {
			messageDiv.textContent = "Please select a PDF file.";
			return;
		}

		const file = fileInput.files[0];
		if (file.type !== "application/pdf") {
			messageDiv.textContent = "Only PDF files are allowed!";
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			messageDiv.textContent = "File size exceeds 2MB limit.";
			return;
		}

		const formData = new FormData();
		formData.append("resume", file);

		try {
			const res = await fetch("/upload", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (data.success) {
				messageDiv.style.color = "#28a745";
				messageDiv.textContent = data.message;
				form.reset();
			} else {
				messageDiv.style.color = "#d9534f";
				messageDiv.textContent = data.message;
			}
		} catch (err) {
			messageDiv.style.color = "#d9534f";
			messageDiv.textContent = "Error uploading file.";
		}
	});
