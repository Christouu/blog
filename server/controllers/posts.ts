import { db } from "../db";
import jwt from "jsonwebtoken";
import { Response, Request, query } from "express";

export const getPosts = (req: Request, res: Response) => {
  const query = req.query.category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(query, [req.query.category], (err, data) => {
    if (err) res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req: Request, res: Response) => {
  const query =
    "SELECT p.id, `username`, `title`, `description`, p.image, u.image AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  //check if there is a token
  if (!token) return res.status(401).json("You are not authenticated");

  //check if token is valid
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO posts(`title`, `description`, `image`, `category`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.json("Post has been created");
    });
  });
};

export const deletePost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  //check if there is a token
  if (!token) return res.status(401).json("You are not authenticated");

  //check if token is valid
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    //if user id is not our id we are not allowed to delete this post
    const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(query, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your posts");

      return res.json("Post has been deleted");
    });
  });
};

export const updatePost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  //check if there is a token
  if (!token) return res.status(401).json("You are not authenticated");

  //check if token is valid
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    const query =
      "UPDATE posts SET `title`=?, `description`=?, `image`=?, `category`=? WHERE `id`= ? AND `uid` = ? ";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.category,
    ];

    db.query(query, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.json("Post has been updated");
    });
  });
};
