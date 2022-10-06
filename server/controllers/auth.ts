import { db } from "../db";

import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  //check existing user
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (Array.isArray(data) && data.length > 0)
      return res.status(409).json("User already exists!");
  });
};

export const login = (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};
