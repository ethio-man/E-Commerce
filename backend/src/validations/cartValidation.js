import Joi from "joi";
export const cartSchema = Joi.object({
  quantity: Joi.number().required(),
  userId: Joi.number(),
  productId: Joi.number().required(),
});
