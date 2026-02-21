import Joi from "joi";
export const productSchema = Joi.object({
  name: Joi.string().max(53).required(),
  status: Joi.string().max(50),
  src: Joi.string().max(200),
  description: Joi.string().max(300),
  brand: Joi.string().max(100),
  colors: Joi.array().items(Joi.string().max(55)),
  sizes: Joi.array().items(Joi.string().max(4)),
  category: Joi.string().max(53),
  number_in_stock: Joi.number().required(),
  price: Joi.number().min(0).required(),
  shipping: Joi.number().min(0).required(),
  tax: Joi.number().min(0).max(100),
  reviewSum: Joi.number().min(0),
  reviewCount: Joi.number().min(0),
  created_by: Joi.number(),
  related_product: Joi.number(), //number because i assummed ids passed
});
