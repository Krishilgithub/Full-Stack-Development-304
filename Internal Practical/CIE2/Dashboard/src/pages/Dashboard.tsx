import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const auth = sessionStorage.getItem("auth");
	let user: { email: string; userType: string } | null = null;
	if (auth) {
		user = JSON.parse(auth);
	}

	useEffect(() => {
		if (!auth) {
			navigate("/login");
		}
	}, [auth, navigate]);

	if (!user) return null;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
				<h2 className="text-2xl font-bold mb-4 text-indigo-700">Dashboard</h2>
				<p className="mb-2">
					Welcome, <span className="font-semibold">{user.email}</span>!
				</p>
				<p className="mb-6">
					You are logged in as{" "}
					<span className="font-semibold capitalize">{user.userType}</span>.
				</p>
				{user.userType === "admin" ? (
					<div className="mb-4 text-green-700 font-semibold">
						Admin Panel: You have access to admin features.
					</div>
				) : (
					<div className="mb-4 text-blue-700 font-semibold">
						User Panel: You have access to user features.
					</div>
				)}
				<button
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-semibold"
					onClick={() => {
						sessionStorage.removeItem("auth");
						navigate("/login");
					}}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Dashboard;
