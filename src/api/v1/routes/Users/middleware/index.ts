import { NextFunction, Request, Response, Router } from "express"

const router = Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("user route Middleware3")
  if (req.headers.test === "123") {
    return res.sendStatus(404)
  }
  return next()
})

export default router
