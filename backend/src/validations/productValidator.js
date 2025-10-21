import Joi from "joi";
export const productSchema = Joi.object({
  product_name: Joi.string().max(53).required(),
  description: Joi.string().max(100),
  brand: Joi.string().max(15),
  category: Joi.string().max(15),
  number_in_stock: Joi.number().required(),
  price: Joi.number().min(0).required(),
  shipping: Joi.number().min(0).required(),
  tax: Joi.number().min(0).max(100),
  rating: Joi.number().min(0).max(5),
});
