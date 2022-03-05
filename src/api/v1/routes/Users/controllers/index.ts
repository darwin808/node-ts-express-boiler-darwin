import { Request, Response, Router } from "express"
import { createUserData, getAllUsers, getUser, updateUserData } from "../services"
import { validateUser } from "../validations"
import Middleware from "../middleware"
const router = Router()
const url = "/users"

router.get(url, Middleware, async (_: Request, res: Response) => {
  try {
    const data = await getAllUsers()
    return res.send({ message: "Users1", data })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})

router.get(url + "/:id", Middleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await getUser(id)
    return res.send({ ok: true, data })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})
router.post(url, async (req: Request, res: Response) => {
  try {
    const { user, profile } = req.body
    const forValidation = {
      email: user.email,
      password: user.password,
      age: profile.age,
      bday: profile.bday
    }
    const value = validateUser(forValidation, res)
    const data = await createUserData(value)
    return res.send({ data, ok: true })
  } catch (error) {
    console.log(error)
    return res.send({ error, ok: false })
  }
})
router.patch(url + "/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { user, profile } = req.body
    const forValidation = {
      email: user.email,
      password: user.password,
      age: profile.age,
      bday: profile.bday
    }
    const value = validateUser(forValidation, res)
    const data = await updateUserData(id, value, profile.id)
    return res.send({ data, ok: true })
  } catch (error) {
    console.log(error)
    return res.send({ error, ok: false })
  }
})
export default router
