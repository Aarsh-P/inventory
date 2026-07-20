import { Search, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import Pagination from '../components/Pagination';
import MultiSelect from '../components/MultiSelect';
import Modal from '../components/Modal';
import ProductRow from '../components/ProductRow';
import { useProductListing } from '../hooks/useProductListing';
import type { SortField } from '../types';

export default function ProductListing() {
  const {
    products,
    categories,
    selectedCats,
    searchInput,
    page,
    totalPages,
    loading,
    sortBy,
    sortOrder,
    isModalOpen,
    setSearchInput,
    setPage,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    toggleSort,
    toggleCategory,
  } = useProductListing();

  // Helper to render the sort arrow icon with proper direction
  const sortIcon = (field: SortField) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-slate-500" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-1 text-indigo-400" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1 text-indigo-400" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Inventory
          </h1>
          <p className="text-slate-400 mt-1">Manage your products and stock levels.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <MultiSelect
          categories={categories}
          selectedCats={selectedCats}
          toggleCategory={toggleCategory}
        />
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-slate-300 text-sm uppercase tracking-wider border-b border-slate-800">
                <th className="p-4 font-medium cursor-pointer select-none" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">
                    <span>Product</span>
                    {sortIcon('name')}
                  </div>
                </th>
                <th className="p-4 font-medium cursor-pointer select-none" onClick={() => toggleSort('quantity')}>
                  <div className="flex items-center gap-1">
                    <span>Quantity</span>
                    {sortIcon('quantity')}
                  </div>
                </th>
                <th className="p-4 font-medium cursor-pointer select-none" onClick={() => toggleSort('category')}>
                  <div className="flex items-center gap-1">
                    <span>Categories</span>
                    {sortIcon('category')}
                  </div>
                </th>
                <th className="p-4 font-medium text-slate-300">Added On</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    onDelete={handleDeleteClick}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={isModalOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
