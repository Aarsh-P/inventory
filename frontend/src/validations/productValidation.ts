import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Product name is required').trim(),
  description: yup.string().required('Description is required').trim(),
  quantity: yup.number().typeError('Quantity must be a number').min(0, 'Quantity cannot be negative').required('Quantity is required'),
  categories: yup.array().of(yup.string().required()).min(1, 'Select at least one category').required('Categories are required'),
});
