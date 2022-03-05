import { Request, Response } from "express"

export const Home = (req: Request, res: Response) => {
  console.log(req.hostname)
  res.send("Hello World")
}
export const NotFound = (req: Request, res: Response) => {
  console.log(req.hostname)
  res.sendStatus(404)
}
