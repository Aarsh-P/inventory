import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden selection:bg-indigo-500/30">
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col gap-8 hidden md:flex z-10 relative">
        <div className="flex items-center gap-3 text-indigo-400 font-bold text-2xl tracking-tight">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Package className="w-6 h-6" />
          </div>
          <span>InvenFlow</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link 
            to="/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive('/products') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link 
            to="/add-product" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive('/add-product') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'}`}
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </Link>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10"></div>
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
