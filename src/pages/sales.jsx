import { Helmet } from "react-helmet-async";

import { ProductProvider } from "src/contexts/productContext";

import SalesView from "src/sections/sales/view/sales-view";


export default function SalesPage() {
    return (
    
        <ProductProvider>
          <Helmet>
            <title> Ventas | Minimal UI </title>
          </Helmet>
          <SalesView />
        </ProductProvider>
     
    );
}