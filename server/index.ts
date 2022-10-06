import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import postsRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.listen(8800, () => {
  console.log("Backend connected");
});
