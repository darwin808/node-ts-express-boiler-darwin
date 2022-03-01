import express from "express"
import { routes } from "./api/v1/routes"
import { middlewares } from "./api/v1/middlewares"

const main = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.listen(port)
  middlewares.defaultMiddleware(app)

  app.get("/", routes.Home)

  app.use("/api", routes.user)
  app.use("/api", routes.posts)
  app.get("*", routes.NotFound)
}

main()
