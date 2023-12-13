import { PropTypes } from 'prop-types';
import { useMemo, useState, useContext, useCallback, createContext } from 'react';

const ProductContext = createContext({
  products: [],
  setProducts: () => {},
  handleAddToCart: () => {},
  handleDeleteToCart: () => {},
  reload: Boolean,
  reloadData: () => {},
});

export const useProductContext = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const reloadData = useCallback(() => {
    setReload(!reload);
  }, [reload]);

  const handleAddToCart = useCallback((product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p._id === product._id);

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      }

      const newProduct = { ...product, quantity: 1 };
      return [...prevProducts, newProduct];
    });
  }, []);



  const handleDeleteToCart = useCallback((product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p._id === product._id);


      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].quantity = updatedProducts[existingProductIndex].quantity>0 ? updatedProducts[existingProductIndex].quantity - 1 : 0;

        return updatedProducts;
      }

      const filteredProducts = prevProducts.filter((p) => p._id !== product._id);
      return [...filteredProducts];
    });
  }, []);

  const contextValue = useMemo(() => ({ products,setProducts, handleAddToCart, handleDeleteToCart, reload, reloadData }), [products,setProducts ,handleAddToCart, handleDeleteToCart, reload, reloadData]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node,
};
