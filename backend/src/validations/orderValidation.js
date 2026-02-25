import Joi from "joi";
export const orderSchema = Joi.object({
  name_on_bank: Joi.max(53).string().required(),
  accountNo: Joi.max(53).string().required(),
  total_price: Joi.number().required(),
  payment_method: Joi.string().max(200).required(),
  user_id: Joi.number().required(),
  address_id: Joi.number().required(),
  paid_status: Joi.string().max(53),
});
