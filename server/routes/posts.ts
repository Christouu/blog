import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts";

const router = express.Router();

//get all posts
router.get("/", getPosts);
//get a specific post
router.get("/:id", getPost);
//create a post
router.post("/", addPost);
//delete a post
router.delete("/:id", deletePost);
//update a post
router.put("/", updatePost);

export default router;
