import React, { useState } from "react";
import "./App.css";

const buttons = [
	["/", "*", "+", "-", "DEL"],
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
	["0", ".", "="],
];

function App() {
	const [expression, setExpression] = useState("");
	const [result, setResult] = useState("");

	const handleClick = (value) => {
		if (value === "DEL") {
			setExpression(expression.slice(0, -1));
			return;
		}
		if (value === "=") {
			try {
				// eslint-disable-next-line no-eval
				const evalResult = eval(expression);
				setResult(evalResult);
			} catch {
				setResult("Err");
			}
			return;
		}
		if (result && "0123456789".includes(value)) {
			setExpression(value);
			setResult("");
			return;
		}
		setExpression(expression + value);
		setResult("");
	};

	return (
		<div className="calculator-container">
			<div className="calculator">
				<div className="display">
					{result !== "" && <span className="result">({result})</span>}
					<span className="expression">{expression || "0"}</span>
				</div>
				<div className="button-row operator-row">
					{buttons[0].map((btn) => (
						<button
							key={btn}
							className={`btn operator${btn === "DEL" ? " del" : ""}`}
							onClick={() => handleClick(btn)}
						>
							{btn}
						</button>
					))}
				</div>
				<div className="button-pad">
					{buttons.slice(1).map((row, i) => (
						<div className="button-row" key={i}>
							{row.map((btn) => (
								<button
									key={btn}
									className={`btn${btn === "=" ? " equals" : ""}`}
									onClick={() => handleClick(btn)}
								>
									{btn}
								</button>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
