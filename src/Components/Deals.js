import { React, useEffect, useState } from "react";
import "./deals.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
import { AddToList, RemoveList } from "../action/List";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import Spinner from "./Spinner";
import LowerNav from "./LowerNav";
import { NavLink } from "react-router-dom";

function Deals() {
  const [AllProducts, setAllProducts] = useState([]);
  const [AddedIds, setAddedIds] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state

  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();

useEffect(() => {
  const GetProducts = async () => {
    try {
      setLoading(true); // Set loading to true at the beginning

      // Create an array of three fetch promises
      const fetchPromises = [
        fetch("https://fakestoreapi.com/products/category/electronics"),
        fetch("https://fakestoreapi.com/products/category/electronics"),
        fetch("https://fakestoreapi.com/products/category/electronics")
      ];

      // Wait for all fetches to complete
      const responses = await Promise.all(fetchPromises);

      // Process each response to JSON
      const jsonDataPromises = responses.map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
      const allJsonData = await Promise.all(jsonDataPromises);

      // Concatenate the data from all responses
      // .flat() is a more concise way to combine arrays of arrays
      const combinedData = allJsonData.flat();

      // Ensure each rendered item has a unique key for React,
      // while preserving the original product ID for navigation.
      let uniqueKeySuffix = 0; // Used to make unique keys for rendering
      const productsWithDetails = combinedData.map((item) => ({
        ...item, // Spreads the original item, including its original 'id'
        // 'item.id' (the original API ID) is preserved.
        // We create a new property 'uniqueRenderKey' for React's list key.
        uniqueRenderKey: `${item.id}-${uniqueKeySuffix++}`,
        reviewNumber: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
      }));

      setAllProducts(productsWithDetails);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Handle error state here, e.g., setError(true) or setAllProducts([])
    } finally {
      setLoading(false);
    }
  };

  GetProducts();
}, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item.id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  return (
    <div className="Deals">
      <p className="deals-head">Destaques 🔥</p>
      {loading && <Spinner />}
      <div className="deal-items">
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className="card" key={items.id}>
                <div className="card-img-data">
                  <img src={items.image} className="card-img" />
                  <img
                    onClick={() => {
                      if (!isAdded(items.id)) {
                        dispatch(AddToList(items));
                      } else {
                        dispatch(RemoveList(items.id));
                      }
                    }}
                    src={isAdded(items.id) ? Added : Add}
                    className="add-list"
                  />

                  <NavLink to={`/product/${items.id}`} key={items.id}>
                    <button className="view">View product</button>
                  </NavLink>
                </div>
                <div className="card-data">
                  <p className="card-title">
                    {items.title.length >= 32
                      ? items.title.slice(0, 32) + ".."
                      : items.title}
                  </p>
                  <div className="category-rating">
                    <p className="card-category">{items.category}</p>
                    <div className="rating">
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <p className="rating-text">
                        {"5 " + "(" + items.reviewNumber + " reviews)"}
                      </p>
                    </div>
                  </div>
                  <div className="card-price">
                    <p className="discount">${items.price}</p>
                    <p className="mrp">${Math.round(items.price * 1.66)}</p>
                    <p className="price-off">(60% OFF)</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </div>
  );
}

export default Deals;
