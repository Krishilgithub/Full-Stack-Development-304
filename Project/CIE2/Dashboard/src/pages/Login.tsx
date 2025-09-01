import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState<"admin" | "user">("user");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Get users from localStorage
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		const user = users.find(
			(u: any) =>
				u.email === email && u.password === password && u.userType === userType
		);
		if (user) {
			sessionStorage.setItem("auth", JSON.stringify({ email, userType }));
			navigate("/dashboard");
		} else {
			setError("Invalid credentials or user type.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
					Login
				</h2>
				{error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
				<div className="mb-4">
					<label className="block mb-1 font-medium">Email</label>
					<input
						type="email"
						className="w-full border rounded px-3 py-2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-1 font-medium">Password</label>
					<input
						type="password"
						className="w-full border rounded px-3 py-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block mb-1 font-medium">User Type</label>
					<select
						className="w-full border rounded px-3 py-2"
						value={userType}
						onChange={(e) => setUserType(e.target.value as "admin" | "user")}
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold"
				>
					Login
				</button>
				<div className="mt-4 text-center text-sm">
					Don't have an account?{" "}
					<a href="/signup" className="text-indigo-600 hover:underline">
						Sign Up
					</a>
				</div>
			</form>
		</div>
	);
};

export default Login;
