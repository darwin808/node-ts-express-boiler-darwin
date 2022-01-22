import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./Users"
import postsRoute from "./Posts"

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: "*"
  })
)
app.use("/api", userRoute)
app.use("/api", postsRoute)

app.get("/", (req: Request, res: Response) => {
  console.log(req)
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
