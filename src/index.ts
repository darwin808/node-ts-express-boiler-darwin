import express from "express"
import { routes } from "./api/v1/routes"
import { middlewares } from "./api/v1/middlewares"

const msg = () => {
  const PORT = process.env.PORT || 3000
  console.log(`✅✅✅  App Running in Port: ${PORT} 🚀🚀🚀 💯`)
}

const main = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.listen(port, msg)
  middlewares.DefaultMiddleware(app)

  app.get("/", routes.Home)

  app.use("/api", routes.Users)
  app.use("/api", routes.Posts)
  app.use("/api", routes.Profile)
  app.get("*", routes.NotFound)
}

main()
