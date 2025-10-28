import Joi from "joi";
export const commentSchema = Joi.object({
  message: Joi.string().min(3).max(250),
  rating: Joi.number().min(1).max(5),
  userId: Joi.number().required(),
  productId: Joi.number().required(),
});
