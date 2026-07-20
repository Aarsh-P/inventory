import { memo } from 'react';
import { Trash2 } from 'lucide-react';
import type { IProduct } from '../types';

interface ProductRowProps {
  product: IProduct;
  onDelete: (id: string) => void;
}

function ProductRow({ product, onDelete }: ProductRowProps) {
  return (
    <tr className="hover:bg-slate-800/20 transition-colors group">
      <td className="p-4">
        <div className="font-semibold text-slate-200">{product.name}</div>
        <div className="text-sm text-slate-500 truncate max-w-xs">{product.description}</div>
      </td>
      <td className="p-4 text-slate-300">
        <span className="px-2 py-1 bg-slate-800 rounded font-mono text-sm border border-slate-700">
          {product.quantity}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {product.categories.map((c) => (
            <span key={c._id} className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
              {c.name}
            </span>
          ))}
        </div>
      </td>
      <td className="p-4 text-sm text-slate-400">
        {new Date(product.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-right">
        <button
          onClick={() => onDelete(product._id)}
          className="p-2 text-rose-400/70 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
          title="Delete product"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

// React.memo prevents re-render when parent state (modal, sort icon) changes
// but this row's product data has not changed.
export default memo(ProductRow);
