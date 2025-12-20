import Joi from "joi";
export const userSchema = Joi.object({
  full_name: Joi.string().min(2).max(53),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100),
  google_id: Joi.string().max(100),
});
