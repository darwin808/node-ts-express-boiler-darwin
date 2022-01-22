import { Request, Response, Router } from "express";
const postsRoute = Router();

postsRoute.get("/posts", async (req: Request, res: Response) => {
  console.log(req, res);
  try {
    return res.send({ message: "Post" });
  } catch (error) {
    return res.send({ error });
  }
});
export default postsRoute;
