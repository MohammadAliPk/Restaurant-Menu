import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Product from "./shared/Product";
import Loader from "./shared/Loader";

// redux
import { fetchProducts } from "../features/products/productsSlice";
const Store = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  useEffect(() => {
    if (!productsState.products.length) dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <Link to="/cart">سبد شما</Link>
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
