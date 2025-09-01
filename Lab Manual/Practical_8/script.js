class GymRepCounter {
	constructor() {
		this.count = 0;
		this.sessionHigh = 0;
		this.totalSessions = 0;
		this.history = [];
		this.currentExercise = "";

		// DOM elements
		this.counterElement = document.getElementById("counter");
		this.exerciseNameInput = document.getElementById("exercise-name");
		this.increaseBtn = document.getElementById("increaseBtn");
		this.decreaseBtn = document.getElementById("decreaseBtn");
		this.resetBtn = document.getElementById("resetBtn");
		this.saveBtn = document.getElementById("saveBtn");
		this.sessionHighElement = document.getElementById("sessionHigh");
		this.totalSessionsElement = document.getElementById("totalSessions");
		this.historyListElement = document.getElementById("historyList");
		this.clearHistoryBtn = document.getElementById("clearHistoryBtn");
		this.toast = document.getElementById("toast");

		this.init();
	}

	init() {
		this.loadData();
		this.setupEventListeners();
		this.updateDisplay();
		this.renderHistory();

		// Set focus on exercise name input
		this.exerciseNameInput.focus();
	}

	setupEventListeners() {
		// Button event listeners
		this.increaseBtn.addEventListener("click", () => this.increaseCount());
		this.decreaseBtn.addEventListener("click", () => this.decreaseCount());
		this.resetBtn.addEventListener("click", () => this.resetCount());
		this.saveBtn.addEventListener("click", () => this.saveSession());
		this.clearHistoryBtn.addEventListener("click", () => this.clearHistory());

		// Exercise name input
		this.exerciseNameInput.addEventListener("input", (e) => {
			this.currentExercise = e.target.value.trim();
			this.saveCurrentSession();
		});

		// Keyboard shortcuts
		document.addEventListener("keydown", (e) => {
			// Prevent shortcuts when typing in input field
			if (e.target === this.exerciseNameInput) return;

			switch (e.key) {
				case "ArrowUp":
				case "+":
				case "=":
					e.preventDefault();
					this.increaseCount();
					break;
				case "ArrowDown":
				case "-":
				case "_":
					e.preventDefault();
					this.decreaseCount();
					break;
				case "r":
				case "R":
					if (e.ctrlKey) {
						e.preventDefault();
						this.resetCount();
					}
					break;
				case "s":
				case "S":
					if (e.ctrlKey) {
						e.preventDefault();
						this.saveSession();
					}
					break;
				case " ":
					e.preventDefault();
					this.increaseCount();
					break;
			}
		});

		// Touch events for mobile
		this.setupTouchEvents();

		// Auto-save every 10 seconds
		setInterval(() => {
			this.saveCurrentSession();
		}, 10000);

		// Save before page unload
		window.addEventListener("beforeunload", () => {
			this.saveCurrentSession();
		});
	}

	setupTouchEvents() {
		let touchStartY = 0;

		this.counterElement.addEventListener("touchstart", (e) => {
			touchStartY = e.touches[0].clientY;
		});

		this.counterElement.addEventListener("touchend", (e) => {
			const touchEndY = e.changedTouches[0].clientY;
			const diff = touchStartY - touchEndY;

			// Swipe up to increase, swipe down to decrease
			if (Math.abs(diff) > 50) {
				if (diff > 0) {
					this.increaseCount();
				} else {
					this.decreaseCount();
				}
			}
		});
	}

	increaseCount() {
		this.count++;
		this.updateSessionHigh();
		this.updateDisplay();
		this.saveCurrentSession();
		this.addPulseEffect();
		this.playFeedback("increase");
	}

	decreaseCount() {
		if (this.count > 0) {
			this.count--;
			this.updateDisplay();
			this.saveCurrentSession();
			this.addPulseEffect();
			this.playFeedback("decrease");
		} else {
			this.showToast("Cannot go below 0!", "warning");
			this.vibrate();
		}
	}

	resetCount() {
		if (this.count > 0) {
			const confirmReset = confirm(`Reset counter from ${this.count} to 0?`);
			if (confirmReset) {
				this.count = 0;
				this.updateDisplay();
				this.saveCurrentSession();
				this.showToast("Counter reset!", "info");
				this.playFeedback("reset");
			}
		}
	}

	saveSession() {
		if (this.count === 0) {
			this.showToast("No reps to save!", "warning");
			return;
		}

		const exerciseName = this.currentExercise || "Unnamed Exercise";
		const session = {
			id: Date.now(),
			exercise: exerciseName,
			reps: this.count,
			date: new Date().toLocaleString(),
			timestamp: Date.now(),
		};

		this.history.unshift(session);

		// Keep only last 50 sessions
		if (this.history.length > 50) {
			this.history = this.history.slice(0, 50);
		}

		this.totalSessions++;
		this.count = 0;

		this.updateDisplay();
		this.renderHistory();
		this.saveData();

		this.showToast(
			`Saved: ${session.reps} reps of ${exerciseName}!`,
			"success"
		);
		this.playFeedback("save");

		// Clear exercise name for next session
		this.exerciseNameInput.value = "";
		this.currentExercise = "";
		this.exerciseNameInput.focus();
	}

	clearHistory() {
		if (this.history.length === 0) {
			this.showToast("No history to clear!", "warning");
			return;
		}

		const confirmClear = confirm("Clear all session history?");
		if (confirmClear) {
			this.history = [];
			this.totalSessions = 0;
			this.renderHistory();
			this.updateDisplay();
			this.saveData();
			this.showToast("History cleared!", "info");
		}
	}

	updateSessionHigh() {
		if (this.count > this.sessionHigh) {
			this.sessionHigh = this.count;
		}
	}

	updateDisplay() {
		// Update counter with animation
		this.counterElement.textContent = this.count;

		// Update stats
		this.sessionHighElement.textContent = this.sessionHigh;
		this.totalSessionsElement.textContent = this.totalSessions;

		// Update button states
		this.decreaseBtn.disabled = this.count === 0;
		this.saveBtn.disabled = this.count === 0;

		// Update button text with current count for context
		if (window.innerWidth > 480) {
			this.resetBtn.querySelector(".btn-text").textContent =
				this.count > 0 ? `Reset (${this.count})` : "Reset";
			this.saveBtn.querySelector(".btn-text").textContent =
				this.count > 0 ? `Save (${this.count})` : "Save Session";
		}
	}

	renderHistory() {
		if (this.history.length === 0) {
			this.historyListElement.innerHTML =
				'<p class="no-history">No sessions saved yet</p>';
			return;
		}

		const historyHTML = this.history
			.map(
				(session) => `
            <div class="history-item">
                <div>
                    <div class="history-exercise">${this.escapeHtml(
											session.exercise
										)}</div>
                    <div class="history-date">${session.date}</div>
                </div>
                <div class="history-reps">${session.reps} reps</div>
            </div>
        `
			)
			.join("");

		this.historyListElement.innerHTML = historyHTML;
	}

	addPulseEffect() {
		const countWrapper = document.querySelector(".count-wrapper");
		countWrapper.classList.add("pulse");
		setTimeout(() => {
			countWrapper.classList.remove("pulse");
		}, 300);
	}

	playFeedback(type) {
		// Visual feedback through button animation
		const buttons = {
			increase: this.increaseBtn,
			decrease: this.decreaseBtn,
			reset: this.resetBtn,
			save: this.saveBtn,
		};

		if (buttons[type]) {
			buttons[type].style.transform = "scale(0.95)";
			setTimeout(() => {
				buttons[type].style.transform = "";
			}, 150);
		}

		// Haptic feedback for mobile devices
		this.vibrate(type);
	}

	vibrate(pattern = "default") {
		if ("vibrate" in navigator) {
			const patterns = {
				default: [50],
				increase: [30],
				decrease: [30],
				reset: [100, 50, 100],
				save: [50, 50, 50],
				warning: [200, 100, 200],
			};

			navigator.vibrate(patterns[pattern] || patterns["default"]);
		}
	}

	showToast(message, type = "info") {
		const colors = {
			success: "#38a169",
			warning: "#ed8936",
			info: "#4299e1",
			error: "#e53e3e",
		};

		this.toast.textContent = message;
		this.toast.style.backgroundColor = colors[type] || colors["info"];
		this.toast.classList.add("show");

		setTimeout(() => {
			this.toast.classList.remove("show");
		}, 3000);
	}

	saveData() {
		const data = {
			count: this.count,
			sessionHigh: this.sessionHigh,
			totalSessions: this.totalSessions,
			history: this.history,
			currentExercise: this.currentExercise,
			lastSaved: Date.now(),
		};

		try {
			localStorage.setItem("gymRepCounter", JSON.stringify(data));
		} catch (error) {
			console.error("Failed to save data:", error);
			this.showToast("Failed to save data!", "error");
		}
	}

	saveCurrentSession() {
		// Save current state without creating a history entry
		const data = {
			count: this.count,
			sessionHigh: this.sessionHigh,
			totalSessions: this.totalSessions,
			history: this.history,
			currentExercise: this.currentExercise,
			lastSaved: Date.now(),
		};

		try {
			localStorage.setItem("gymRepCounter", JSON.stringify(data));
		} catch (error) {
			console.error("Failed to save current session:", error);
		}
	}

	loadData() {
		try {
			const savedData = localStorage.getItem("gymRepCounter");
			if (savedData) {
				const data = JSON.parse(savedData);

				this.count = data.count || 0;
				this.sessionHigh = data.sessionHigh || 0;
				this.totalSessions = data.totalSessions || 0;
				this.history = data.history || [];
				this.currentExercise = data.currentExercise || "";

				// Restore exercise name
				if (this.currentExercise) {
					this.exerciseNameInput.value = this.currentExercise;
				}

				// Show welcome back message if there's saved data
				if (data.lastSaved && Date.now() - data.lastSaved > 60000) {
					// 1 minute
					setTimeout(() => {
						this.showToast(
							"Welcome back! Your progress has been restored.",
							"success"
						);
					}, 1000);
				}
			}
		} catch (error) {
			console.error("Failed to load data:", error);
			this.showToast("Failed to load saved data!", "error");
		}
	}

	escapeHtml(text) {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	// Export data for backup
	exportData() {
		const data = {
			count: this.count,
			sessionHigh: this.sessionHigh,
			totalSessions: this.totalSessions,
			history: this.history,
			exportDate: new Date().toISOString(),
		};

		const dataStr = JSON.stringify(data, null, 2);
		const dataBlob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(dataBlob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `gym-rep-counter-backup-${
			new Date().toISOString().split("T")[0]
		}.json`;
		link.click();

		URL.revokeObjectURL(url);
		this.showToast("Data exported successfully!", "success");
	}
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	const counter = new GymRepCounter();

	// Add export functionality (hidden feature - double click on title)
	const title = document.querySelector("h1");
	let clickCount = 0;
	title.addEventListener("click", () => {
		clickCount++;
		if (clickCount === 2) {
			counter.exportData();
			clickCount = 0;
		}
		setTimeout(() => {
			clickCount = 0;
		}, 500);
	});

	// Service Worker registration for PWA (if needed in future)
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("./sw.js").catch((err) => {
			console.log("ServiceWorker registration failed: ", err);
		});
	}

	// Make counter globally accessible for debugging
	window.gymCounter = counter;
});

// Prevent zoom on double tap for better mobile experience
document.addEventListener("touchend", (e) => {
	const now = new Date().getTime();
	const timeSince = now - (window.lastTap || 0);

	if (timeSince < 500 && timeSince > 0) {
		e.preventDefault();
	}

	window.lastTap = now;
});

// Handle visibility change to save data when app goes to background
document.addEventListener("visibilitychange", () => {
	if (document.hidden && window.gymCounter) {
		window.gymCounter.saveCurrentSession();
	}
});
