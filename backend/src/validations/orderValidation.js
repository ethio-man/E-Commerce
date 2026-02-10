import Joi from "joi";
export const orderSchema = Joi.object({
  total_price: Joi.number().required(),
  payment_method: Joi.string().max(200).required(),
  user_id: Joi.number().required(),
  address_id: Joi.number().required(),
});
