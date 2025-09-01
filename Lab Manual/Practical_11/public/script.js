document.getElementById("greetBtn").addEventListener("click", function () {
	const msg = document.getElementById("greetingMsg");
	msg.style.display = "block";
	msg.innerHTML =
		"<strong>👋 Hello, welcome to your interactive dashboard!</strong>";
});
