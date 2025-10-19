import Joi from "joi";
export const userSchema = Joi.object({
  userName: Joi.string().min(2).max(53).required(),
  email: Joi.string().email().required(),
  passwords: Joi.string().min(6).max(100).required(),
});
