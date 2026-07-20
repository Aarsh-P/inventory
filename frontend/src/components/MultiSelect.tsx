import { useState, useRef, useEffect } from 'react';
import { Tag, ChevronDown, Check } from 'lucide-react';

interface MultiSelectProps {
  categories: any[];
  selectedCats: string[];
  toggleCategory: (id: string) => void;
  hasError?: boolean;
  placeholder?: string;
}

export default function MultiSelect({ 
  categories, 
  selectedCats, 
  toggleCategory, 
  hasError = false,
  placeholder = 'Filter Categories'
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-slate-900/50 border rounded-xl px-4 py-2.5 text-slate-200 hover:bg-slate-800 transition-all focus:outline-none focus:ring-1 w-full justify-between ${
          hasError 
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
            : 'border-slate-700/50 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-sm text-slate-300">
            {placeholder} {selectedCats.length > 0 && `(${selectedCats.length})`}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full max-h-72 overflow-y-auto bg-slate-950 border border-slate-700/80 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {categories.length === 0 ? (
            <div className="p-3 text-sm text-slate-500 text-center">No categories found</div>
          ) : (
            categories.map((cat) => {
              const isSelected = selectedCats.includes(cat._id);
              return (
                <button
                  type="button"
                  key={cat._id}
                  onClick={() => toggleCategory(cat._id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all hover:bg-slate-800/80"
                >
                  <span className={`${isSelected ? 'text-indigo-400 font-medium' : 'text-slate-300'}`}>
                    {cat.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-500" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
