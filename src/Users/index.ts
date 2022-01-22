import { Request, Response, Router } from "express";
const userRoute = Router();

userRoute.get("/users", async (req: Request, res: Response) => {
  console.log(req, res);
  try {
    return res.send({ message: "Users" });
  } catch (error) {
    return res.send({ error });
  }
});
export default userRoute;
