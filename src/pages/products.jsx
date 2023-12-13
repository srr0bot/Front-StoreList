import { Helmet } from 'react-helmet-async';

import { ProductProvider } from 'src/contexts/productContext';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    
      <ProductProvider>
        <Helmet>
          <title> Products | Minimal UI </title>
        </Helmet>
        <ProductsView />
      </ProductProvider>
   
  );
}
