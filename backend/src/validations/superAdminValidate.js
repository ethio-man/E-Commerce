import Joi from "joi";
export const superAdminSchema = Joi.object({
  username: Joi.string().max(53).required(),
  password: Joi.string().max(53).required(),
});
