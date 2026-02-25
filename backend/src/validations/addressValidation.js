import Joi from "joi";
export const addressSchema = Joi.object({
  user_id: Joi.number().required(),
  country: Joi.string().max(53),
  state: Joi.string().max(53),
  appartment: Joi.string().max(53),
  city: Joi.string().required(),
  postal_code: Joi.number().required(),
});
