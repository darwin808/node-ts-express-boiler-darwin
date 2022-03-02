import { Request, Response } from "express"
import Joi from "joi"

export const validateUser = (req: Request, res: Response) => {
  const userSchema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    age: Joi.number().required(),
    bday: Joi.string().required()
  })
  const result = userSchema.validate(req.body)
  const { value, error } = result
  if (error) {
    console.log(error.details)
    return res.send({ error: error.details[0].message || "ERROR" })
  }
  return value
}
