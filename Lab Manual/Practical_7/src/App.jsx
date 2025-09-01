import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

function Home() {
	return (
		<section className="mb-5 text-center">
			<h2 className="display-4 fw-bold mb-3">Home</h2>
			<p className="lead">
				Welcome to the modern sidebar navigation demo using React and Bootstrap!
			</p>
		</section>
	);
}
function About() {
	return (
		<section className="mb-5 text-center">
			<h2 className="display-5 fw-bold mb-3">About</h2>
			<p className="lead">
				This is a sample sidebar navigation menu built with React hooks and
				Bootstrap 5.
			</p>
		</section>
	);
}
function Services() {
	return (
		<section className="mb-5 text-center">
			<h2 className="display-5 fw-bold mb-3">Services</h2>
			<p className="lead">
				We offer intuitive, attractive, and responsive UI solutions for your web
				projects.
			</p>
		</section>
	);
}
function Contact() {
	return (
		<section className="text-center">
			<h2 className="display-5 fw-bold mb-3">Contact</h2>
			<p className="lead">
				Get in touch for more information or to start your next project!
			</p>
		</section>
	);
}

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

	return (
		<div className="d-flex min-vh-100 bg-light">
			{/* Sidebar */}
			<nav
				className={`sidebar bg-dark text-white d-flex flex-column align-items-center justify-content-between p-3 position-fixed shadow-lg ${
					sidebarOpen ? "sidebar-open" : "sidebar-closed"
				}`}
				style={{
					width: sidebarOpen ? 220 : 64,
					transition: "width 0.3s",
					top: 0,
					bottom: 0,
					left: 0,
					zIndex: 1040,
				}}
			>
				<div className="w-100">
					<div className="d-flex align-items-center justify-content-center mb-4 mt-2">
						<button
							className="btn btn-outline-light btn-sm me-2 rounded-circle d-flex align-items-center justify-content-center"
							onClick={handleSidebarToggle}
							aria-label="Toggle sidebar"
							style={{ width: 36, height: 36 }}
						>
							<i className="bi bi-list fs-4"></i>
						</button>
						{sidebarOpen && <span className="ms-2 fs-5 fw-bold">MyApp</span>}
					</div>
					<div className="d-flex flex-column align-items-center w-100">
						<div className="mb-4">
							<img
								src="https://i.pravatar.cc/48?img=3"
								alt="Avatar"
								className="rounded-circle border border-2 border-primary"
								style={{ width: 48, height: 48 }}
							/>
						</div>
						<ul className="nav nav-pills flex-column w-100 gap-2">
							<li className="nav-item">
								<NavLink
									to="/"
									end
									className={({ isActive }) =>
										`nav-link text-white d-flex align-items-center gap-2 px-3 py-2 sidebar-link${
											isActive ? " active" : ""
										}`
									}
								>
									<i className="bi bi-house-door fs-5"></i>
									{sidebarOpen && <span>Home</span>}
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/about"
									className={({ isActive }) =>
										`nav-link text-white d-flex align-items-center gap-2 px-3 py-2 sidebar-link${
											isActive ? " active" : ""
										}`
									}
								>
									<i className="bi bi-person fs-5"></i>
									{sidebarOpen && <span>About</span>}
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/services"
									className={({ isActive }) =>
										`nav-link text-white d-flex align-items-center gap-2 px-3 py-2 sidebar-link${
											isActive ? " active" : ""
										}`
									}
								>
									<i className="bi bi-gear fs-5"></i>
									{sidebarOpen && <span>Services</span>}
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/contact"
									className={({ isActive }) =>
										`nav-link text-white d-flex align-items-center gap-2 px-3 py-2 sidebar-link${
											isActive ? " active" : ""
										}`
									}
								>
									<i className="bi bi-envelope fs-5"></i>
									{sidebarOpen && <span>Contact</span>}
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* Main Content */}
			<div
				className="flex-grow-1 d-flex align-items-center justify-content-center"
				style={{
					marginLeft: sidebarOpen ? 220 : 64,
					transition: "margin-left 0.3s",
				}}
			>
				<div className="container py-5">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/services" element={<Services />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
