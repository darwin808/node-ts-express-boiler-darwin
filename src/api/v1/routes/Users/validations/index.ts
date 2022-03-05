import { Response } from "express"
import Joi from "joi"

export const validateUser = (req: any, res: Response) => {
  const userSchema = Joi.object().keys({
    email: Joi.string().min(6).trim().required().email(),
    password: Joi.string().min(6).required().max(40).trim(),
    age: Joi.string().required(),
    bday: Joi.string().required()
  })
  const result = userSchema.validate(req)
  const { value, error } = result
  if (error) {
    console.log(error.details)
    return res.send({ error: error.details[0].message || "ERROR" })
  }
  return value
}
