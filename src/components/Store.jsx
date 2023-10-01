import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// ant design
import { Button, Modal } from "antd";

// Components
import Product from "./shared/Product";
import Loader from "./shared/Loader";

// redux
import { fetchProducts } from "../features/products/productsSlice";

// Actions
import {
  increament,
  decreament,
  addItem,
  removeItem,
} from "../features/cart/cartSlice";

// functions
import { isInCart, quantityCount } from "../helper/functions";

// Icons
import trashIcon from "../assets/icons/trash.svg";

const Store = () => {
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState(2);

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const modalData = productsState.products[modalId - 1];

  const state = useSelector((state) => state.cart);

  useEffect(() => {
    if (!productsState.products.length) dispatch(fetchProducts());
  }, []);

  const modalHandler = (id) => {
    setOpen(true);
    setModalId(id);
  };

  const modalHandlerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link to="/cart">سبد شما</Link>
      {productsState.loading ? (
        <Loader />
      ) : productsState.error ? (
        <p>Somethin went wrong</p>
      ) : (
        productsState.products.map((product) => (
          <Product
            key={product.id}
            productData={product}
            modalHandler={modalHandler}
          />
        ))
      )}
      <Modal
        open={open}
        title="Title"
        onOk={() => dispatch(addItem(modalData))}
        onCancel={() => modalHandlerClose()}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button>Custom Button</Button>
            <CancelBtn />
            {quantityCount(state, modalId) === 1 && (
              <button onClick={() => dispatch(removeItem(modalData))}>
                <img src={trashIcon} alt="trash" />
              </button>
            )}
            {quantityCount(state, modalId) > 1 && (
              <button onClick={() => dispatch(decreament(modalData))}>-</button>
            )}
            {quantityCount(state, modalId) > 0 && (
              <span>{quantityCount(state, modalId)}</span>
            )}
            {isInCart(state, modalId) ? (
              <button onClick={() => dispatch(increament(modalData))}>+</button>
            ) : (
              <button onClick={() => dispatch(addItem(modalData))}>
                Add to Cart
              </button>
            )}
          </>
        )}
      >
        {modalData ? (
          <div>
            <img src={modalData.image} alt="product" />
            <div>
              <h3>{modalData.title}</h3>
              <p>{modalData.description}</p>
              <p>
                <span>Category:</span> {modalData.category}
              </p>
              <div>
                <span>{modalData.price} $</span>
                <Link to="/products">Back to Shop</Link>
              </div>
            </div>{" "}
          </div>
        ) : (
          "loading..."
        )}
      </Modal>
    </div>
  );
};

export default Store;
