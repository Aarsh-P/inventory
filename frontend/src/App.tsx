import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { Loader2 } from 'lucide-react';

// Route-level code splitting: each page is downloaded only when first visited
const ProductListing = lazy(() => import('./pages/ProductListing'));
const AddProduct = lazy(() => import('./pages/AddProduct'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f1f5f9',
            border: '1px solid #1e293b',
          },
        }}
      />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
