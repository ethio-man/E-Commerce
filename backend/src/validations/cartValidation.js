import Joi from "joi";
export const cartSchema = Joi.object({
  user_id: Joi.number(),
  product_id: Joi.number().required(),
  quantity: Joi.number().required(),
});
