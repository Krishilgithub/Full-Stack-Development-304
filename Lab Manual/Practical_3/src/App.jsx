import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDateTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="welcome-container">
			<h1>Welcome to Charusat</h1>
			<p>Current local date and time:</p>
			<h2>{dateTime.toLocaleString()}</h2>
		</div>
	);
}

export default App;
