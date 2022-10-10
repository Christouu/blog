import cors from "cors";
import multer from "multer";
import express, { Request } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";
import usersRoutes from "./routes/users";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//adding images from FE to BE and uploading them upload folder in FE
//make this interfaces otherwise you get an error are line 35
interface MulterRequest extends Request {
  file: any;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //store images at FE public folder
    cb(null, "../app/public/upload");
  },
  filename: function (req, file, cb) {
    //if we upload same images they will overwrite
    //using Date.now() for unique strings to prevent that
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = (req as MulterRequest).file;
  res.status(200).json(file.filename);
});
//above code is using multer for handling uploading files

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.listen(8800, () => {
  console.log("Backend connected");
});
