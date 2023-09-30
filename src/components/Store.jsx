import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Product from "./shared/Product";
import Loader from "./shared/Loader";

// redux
import { fetchProducts } from "../redux/products/productsAction";

const Store = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);

  useEffect(() => {
    if (!productsState.products.length) dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {productsState.loading ? (
        <Loader />
      ) : productsState.error ? (
        <p>Somethin went wrong</p>
      ) : (
        productsState.products.map((product) => (
          <Product key={product.id} productData={product} />
        ))
      )}
    </div>
  );
};

export default Store;
