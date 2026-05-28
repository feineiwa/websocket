import express from "express";
import path from "path";

import authRoutes from "./routes/auth.route.js"
import messagesRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import { ENV } from "../src/lib/env.js"

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3001;

app.use(express.json()); //req.body

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => { 
	console.log("Server is running on port: " + PORT) 
	connectDb()
});

