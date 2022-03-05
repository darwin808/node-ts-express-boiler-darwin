import User from "./Users/controllers"
import Posts from "./Posts/controller"
import { Home, NotFound } from "./app/controllers"

export const routes = {
  Home,
  NotFound,
  User,
  Posts
}
