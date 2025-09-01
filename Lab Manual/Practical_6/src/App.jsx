import { useState } from "react";
import "./App.css";

function App() {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");
	const [editIndex, setEditIndex] = useState(null);
	const [editValue, setEditValue] = useState("");

	const handleAddTask = () => {
		if (input.trim() === "") return;
		setTasks([...tasks, input.trim()]);
		setInput("");
	};

	const handleDeleteTask = (idx) => {
		setTasks(tasks.filter((_, i) => i !== idx));
		if (editIndex === idx) {
			setEditIndex(null);
			setEditValue("");
		}
	};

	const handleEditTask = (idx) => {
		setEditIndex(idx);
		setEditValue(tasks[idx]);
	};

	const handleSaveEdit = (idx) => {
		if (editValue.trim() === "") return;
		setTasks(tasks.map((task, i) => (i === idx ? editValue.trim() : task)));
		setEditIndex(null);
		setEditValue("");
	};

	const handleInputKeyDown = (e) => {
		if (e.key === "Enter") handleAddTask();
	};

	return (
		<div className="todo-container">
			<h2 className="todo-title">Get Things Done !</h2>
			<div className="todo-input-row">
				<input
					className="todo-input"
					type="text"
					placeholder="What is the task today?"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleInputKeyDown}
				/>
				<button className="todo-add-btn" onClick={handleAddTask}>
					Add Task
				</button>
			</div>
			<div className="todo-list">
				{tasks.map((task, idx) => (
					<div className="todo-task-row" key={idx}>
						{editIndex === idx ? (
							<>
								<input
									className="todo-edit-input"
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") handleSaveEdit(idx);
									}}
									autoFocus
								/>
								<button
									className="todo-save-btn"
									onClick={() => handleSaveEdit(idx)}
									title="Save"
								>
									<span role="img" aria-label="save">
										💾
									</span>
								</button>
								<button
									className="todo-cancel-btn"
									onClick={() => setEditIndex(null)}
									title="Cancel"
								>
									<span role="img" aria-label="cancel">
										❌
									</span>
								</button>
							</>
						) : (
							<>
								<span className="todo-task-text">{task}</span>
								<button
									className="todo-edit-btn"
									onClick={() => handleEditTask(idx)}
									title="Edit"
								>
									<span role="img" aria-label="edit">
										✏️
									</span>
								</button>
								<button
									className="todo-delete-btn"
									onClick={() => handleDeleteTask(idx)}
									title="Delete"
								>
									<span role="img" aria-label="delete">
										🗑️
									</span>
								</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
