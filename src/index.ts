import express from "express"
import { routes } from "./api/v1/routes"
import Middlewares from "./api/v1/routes/app/middlewares"

const msg = () => {
  const PORT = process.env.PORT || 3000
  console.log(`✅✅✅  App Running in Port: ${PORT} 🚀🚀🚀 💯`)
}

const main = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.listen(port, msg)
  Middlewares(app)

  app.get("/", routes.Home)

  app.use("/api", routes.User)
  app.use("/api", routes.Posts)
  app.get("*", routes.NotFound)
}

main()
