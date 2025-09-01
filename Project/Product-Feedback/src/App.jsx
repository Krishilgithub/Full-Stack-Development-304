import React, { useState, useEffect } from "react";
import "./App.css";

// GreetingForm Component
function GreetingForm({ onNameChange, firstName, surname }) {
	return (
		<div className="greeting-form">
      <div className="input-fields">
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => onNameChange(e.target.value, surname)}
          style={{marginRight: "10px"}}
				/>
				<input
					type="text"
					placeholder="Surname"
					value={surname}
					onChange={(e) => onNameChange(firstName, e.target.value)}
				/>
			</div>
			{/* Move welcome message below inputs */}
			{firstName && surname && (
				<div
					style={{ width: "100%", textAlign: "center", marginTop: "0.5rem" }}
				>
					<h2>
						Welcome, {firstName} {surname}!
					</h2>
				</div>
			)}
		</div>
	);
}

// LiveClock Component
function LiveClock() {
	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<div className="live-clock">
			<span>
				{now.toLocaleDateString()} {now.toLocaleTimeString()}
			</span>
		</div>
	);
}

// FeedbackPanel Component
function FeedbackPanel({ feedbackCounts, onFeedback }) {
	return (
		<div className="feedback-panel">
			{["Excellent", "Good", "Average", "Poor"].map((category) => (
				<div key={category} className="feedback-category" style={{marginRight: "10px"}}>
					<button onClick={() => onFeedback(category)}>{category}</button>
					<div className="feedback-count">{feedbackCounts[category]}</div>
				</div>
			))}
		</div>
	);
}

// ParticipantCounter Component
function ParticipantCounter({
	count,
	onIncrement,
	onDecrement,
	onReset,
	onIncrementByFive,
}) {
	return (
		<div className="participant-counter">
			<h3>Your Feedbacks: {count}</h3>
			<div className="function-buttons">
				<button onClick={onIncrement}>+1</button>
				<button onClick={onDecrement} disabled={count === 0}>
					-1
				</button>
				<button onClick={onReset}>Reset</button>
				<button onClick={onIncrementByFive}>+5</button>
			</div>
		</div>
	);
}

// Main App
export default function App() {
	// Greeting state
	const [firstName, setFirstName] = useState("");
	const [surname, setSurname] = useState("");

	// Feedback counts
	const [feedbackCounts, setFeedbackCounts] = useState({
		Excellent: 0,
		Good: 0,
		Average: 0,
		Poor: 0,
	});

	// Participant feedback count
	const [participantCount, setParticipantCount] = useState(0);

	// Handle feedback button click
	const handleFeedback = (category) => {
		setFeedbackCounts((prev) => ({
			...prev,
			[category]: prev[category] + 1,
		}));
		setParticipantCount((count) => count + 1);
	};

	// Simulate crowd feedback
	useEffect(() => {
		const categories = ["Excellent", "Good", "Average", "Poor"];
		const interval = setInterval(() => {
			const randomCategory =
				categories[Math.floor(Math.random() * categories.length)];
			setFeedbackCounts((prev) => ({
				...prev,
				[randomCategory]: prev[randomCategory] + 1,
			}));
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	// Participant counter handlers
	const handleIncrement = () => setParticipantCount((c) => c + 1);
	const handleDecrement = () => setParticipantCount((c) => (c > 0 ? c - 1 : 0));
	const handleReset = () => setParticipantCount(0);
	const handleIncrementByFive = () => setParticipantCount((c) => c + 5);

	return (
		<div className="dashboard">
			<h1>Product Feedback Dashboard</h1>

			<GreetingForm
				firstName={firstName}
				surname={surname}
				onNameChange={(fn, sn) => {
					setFirstName(fn);
					setSurname(sn);
				}}
			/>

      
			<LiveClock />

			<FeedbackPanel
				feedbackCounts={feedbackCounts}
				onFeedback={handleFeedback}
			/>

			<ParticipantCounter
				count={participantCount}
				onIncrement={handleIncrement}
				onDecrement={handleDecrement}
				onReset={handleReset}
				onIncrementByFive={handleIncrementByFive}
			/>
		</div>
	);
}
