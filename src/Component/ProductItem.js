


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductToview, addproducts, addCart, CartItems } from "../actions";
import { useNavigate } from "react-router-dom";
import customFetch from "../apiCall";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../Notification/notify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductItem({ item }) {
  const [addedItem, setAddedItem] = useState(true);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }

  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatch(addCart(item));
      dispatch(CartItems());
      setAddedItem(false);
      showToastMessage("Item added to cart", "success");
    } else {
      navigate("/cart");
    }
  }

  function handleEdit(item) {
    item.edit = false;
    dispatch(addproducts([...products]));
  }

  function handleDeleteProduct(item) {
    const url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    customFetch(url, { method: "DELETE" }).then(() => {
      const updatedProducts = products.filter((p) => p.id !== item.id);
      dispatch(addproducts(updatedProducts));
      showToastMessage("Item deleted", "warning");
    });
  }

  function handleCancel(item) {
    item.edit = true;
    dispatch(addproducts([...products]));
  }

  function handleSave(item) {
    const url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    const updatedItem = { ...item, title, price, description, edit: true };
    customFetch(url, {
      body: updatedItem,
      method: "PUT",
    }).then((data) => {
      const index = products.indexOf(item);
      products[index] = data;
      dispatch(addproducts([...products]));
      showToastMessage("Edit successful", "success");
    });
  }

  return (
    <div className="d-flex container-sm bg-white px-1 py-5 mt-4 flex-column flex-lg-row gap-3">
      <ToastContainer />
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width="200rem"
          onClick={() => handleClick(item)}
        />
        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span>{item.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {item.edit ? (
            <span>{item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="p-2">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "9rem", backgroundColor: "var(--nav)" }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "Add to Cart" : "Go to Cart"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}

        {item.edit ? (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
              alt="Edit"
              width="30rem"
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(item)}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8556/8556073.png"
              alt="Delete"
              width="30rem"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteProduct(item)}
            />
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}


