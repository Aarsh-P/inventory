import { Router } from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { productSchema } from '../validations/productValidation';

const router = Router();

router.route('/')
  .get(getProducts)
  .post(validate(productSchema), createProduct);

router.route('/:id')
  .delete(deleteProduct);

export default router;
