import { NextFunction, Request, Response, Router } from "express"
import { db } from "../../db/db"
const user = Router()

// Middleware
user.use((req: Request, res: Response, next: NextFunction) => {
  console.log("user route")

  if (req.headers.test === "123") {
    return res.sendStatus(404)
  }
  return next()
})

user.get("/users", async (_: Request, res: Response) => {
  try {
    const { rows } = await db.getUsers()
    return res.send({ message: "Users1", data: rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})
user.get("/profile", async (_: Request, res: Response) => {
  try {
    const { rows } = await db.getProfile()
    return res.send({ message: "profile", data: rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})
export default user
