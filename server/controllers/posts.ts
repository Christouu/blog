import { Response, Request } from "express";

export const addPost = (req: Request, res: Response) => {
  res.json("from controller");
};
