import { NextFunction, Request, Response, Router } from "express"
const posts = Router()

posts.use((req: Request, res: Response, next: NextFunction) => {
  console.log("posts route")

  if (req.headers.test === "123") {
    return res.sendStatus(404)
  }
  return next()
})

posts.get("/posts", async (req: Request, res: Response) => {
  console.log(req, res)
  try {
    return res.send({ message: " Post123" })
  } catch (error) {
    return res.send({ error })
  }
})
export default posts
