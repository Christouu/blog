import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import bcrypt from "bcryptjs";

export const register = (req: Request, res: Response) => {
  //check existing user
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (Array.isArray(data) && data.length > 0)
      return res.status(409).json("User already exists!");

    //hash to password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hashedPassword];

    db.query(query, [values], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("User has been created!");
    });
  });
};

export const login = (req: Request, res: Response) => {
  //check if user exists
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (Array.isArray(data) && data.length === 0)
      //we don't any users with this name
      return res.status(404).json("User now found");

    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    ); // data[0] is our found user

    if (!isPasswordCorrect) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...otherInfo } = data[0];

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherInfo);
  });
};

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logout");
};
