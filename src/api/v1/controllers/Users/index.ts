import { validateUser } from "./../../validations/index"
import { NextFunction, Request, Response, Router } from "express"
import { db } from "../../db/db"
const router = Router()

const ROUTE: string = "/users"
// Middleware
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers)

  if (req.headers.appkey !== "1") {
    return res.sendStatus(403)
  }
  return next()
})

router.get(ROUTE, async (_: Request, res: Response) => {
  try {
    const { rows } = await db.getUsers()
    return res.send({ message: "Users1", data: rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})

router.get(ROUTE + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { rows } = await db.getUser(+id)
    return res.send({ message: "User", data: rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})

router.post(ROUTE, async (req: Request, res: Response) => {
  try {
    const value = validateUser(req, res)
    const { email, password, age, bday } = value
    await db.createUser(email, password)

    const user = await db.findUser(email)
    const profile = await db.createProfile(age, bday, +user.rows[0].id)

    return res.send({ message: "ok", data: profile.rows, user })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})

router.patch(ROUTE + "/:id", async (req: Request, res: Response) => {
  try {
    const value = validateUser(req, res)
    const { email, password, age, bday } = value
    const { id } = req.params
    await db.updateUser(email, password, +id)
    const user = await db.findUser(email)
    const profile = await db.updateProfile(age, bday, +user.rows[0].id)
    return res.send({ message: "ok", data: profile.rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})
export default router
