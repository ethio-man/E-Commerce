import Joi from "joi";
export const itemsValidator = Joi.object({
  amount: Joi.number().required(),
  orderId: Joi.number().required(),
  productId: Joi.number().required(),
});
