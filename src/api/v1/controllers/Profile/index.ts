import { NextFunction, Request, Response, Router } from "express"
import { db } from "../../db/db"
const router = Router()

const ROUTE: string = "/profile"
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
    const { rows } = await db.getProfile()
    return res.send({ message: "profile", data: rows })
  } catch (error) {
    console.log(error)
    return res.send({ error })
  }
})
export default router
