import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCategories, createProduct } from '../services/api';
import { Save, AlertCircle } from 'lucide-react';
import { productSchema } from '../validations/productValidation';
import MultiSelect from '../components/MultiSelect';
import toast from 'react-hot-toast';

interface ProductFormValues {
  name: string;
  description: string;
  quantity: number;
  categories: string[];
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      quantity: 0,
      categories: []
    }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load categories';
      toast.error(msg);
      console.error(err);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    setError('');
    setLoading(true);
    try {
      await createProduct(data);
      toast.success('Product created successfully!');
      navigate('/products');
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Failed to create product';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Add New Product
        </h1>
        <p className="text-slate-400 mt-1">Create a new item in your inventory system.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5" />
          <div className="text-rose-300 text-sm font-medium">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            {...register('name')}
            className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 ${
              errors.name 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                : 'border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
            placeholder="Enter unique product name"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            {...register('description')}
            className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 resize-none ${
              errors.description 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                : 'border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
            placeholder="Product details..."
          />
          {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Quantity <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            {...register('quantity', { valueAsNumber: true })}
            className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 transition-all ${
              errors.quantity 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                : 'border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.quantity && <p className="text-rose-400 text-xs mt-1">{errors.quantity.message}</p>}
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium text-slate-300">
            Categories <span className="text-rose-500">*</span>
          </label>
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <MultiSelect 
                categories={categories} 
                selectedCats={field.value} 
                hasError={!!errors.categories}
                placeholder="Select Categories"
                toggleCategory={(id) => {
                  const currentValues = field.value || [];
                  const newValues = currentValues.includes(id)
                    ? currentValues.filter(c => c !== id)
                    : [...currentValues, id];
                  field.onChange(newValues);
                }} 
              />
            )}
          />
          {errors.categories && <p className="text-rose-400 text-xs mt-1">{errors.categories.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}
