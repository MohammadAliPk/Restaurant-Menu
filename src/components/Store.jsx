import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// ant design
import { Button, Modal, Row } from "antd";

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

// css
import "./store.module.css";

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
      {productsState.loading ? (
        <Loader />
      ) : productsState.error ? (
        <p>Somethin went wrong</p>
      ) : (
        <>
          <nav>
            <div></div>
            <div></div>
          </nav>
          <Link to="/cart">سبد شما</Link>
          {productsState.products.map((product) => (
            <Product
              key={product.id}
              productData={product}
              modalHandler={modalHandler}
            />
          ))}
        </>
      )}
      <Modal
        open={open}
        title="Title"
        onOk={() => dispatch(addItem(modalData))}
        onCancel={() => modalHandlerClose()}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            {quantityCount(state, modalId) === 1 && (
              <Button onClick={() => dispatch(removeItem(modalData))}>
                <img src={trashIcon} alt="trash" style={{ width: "15px" }} />
              </Button>
            )}
            {quantityCount(state, modalId) > 1 && (
              <Button onClick={() => dispatch(decreament(modalData))}>-</Button>
            )}
            {quantityCount(state, modalId) > 0 && (
              <span>{quantityCount(state, modalId)}</span>
            )}
            {isInCart(state, modalId) ? (
              <Button onClick={() => dispatch(increament(modalData))}>+</Button>
            ) : (
              <Button onClick={() => dispatch(addItem(modalData))}>
                Add to Cart
              </Button>
            )}
          </>
        )}
      >
        {modalData ? (
          <div>
            <img
              src={modalData.image}
              alt="product"
              style={{ width: "100%" }}
            />
            <div>
              <h3>{modalData.title}</h3>
              <p>{modalData.description}</p>
              <p>
                <span>Category:</span> {modalData.category}
              </p>
              <div>
                <span>{modalData.price} $</span>
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
