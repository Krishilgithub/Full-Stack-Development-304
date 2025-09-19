import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.get("/api/features", (req, res) => {
	res.json([
		{ id: 1, title: "Responsive Design", icon: "🖥️" },
		{ id: 2, title: "Fast Loading", icon: "⚡" },
		{ id: 3, title: "Modern UI", icon: "🎨" },
		{ id: 4, title: "Easy to Use", icon: "👍" },
	]);
});

// Serve main page for all routes (SPA support)
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
