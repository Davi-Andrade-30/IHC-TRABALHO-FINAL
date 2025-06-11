import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./cart.css";
import { AddToList, RemoveList } from "../action/List";
import { IncreaseQuantity, DecreaseQuantity } from "../action/Cart";
import { RemoveCart } from "../action/Cart";
import save from "../imgs/save.png";
import saved from "../imgs/saved.png";
import Delete from "../imgs/delete.png";
import Empty from "../imgs/cart-empty.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LowerNav from "./LowerNav";

function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();
  const [AddedIds, setAddedIds] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [promocode, setPromocode] = useState("");
  const [discountCode, setdiscountCode] = useState("");
  const [CorrectCode, setCorrectCode] = useState(false);
  // const [total, setTotal] = useState(0); // Este estado 'total' não estava a ser usado para exibir o valor final. Removido para clareza, a menos que tenha outro propósito.

  const navigate = useNavigate();

  document.title = "Seu Carrinho";

  useEffect(() => {
    const newSubtotal = CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubTotal(newSubtotal);
  }, [CartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // CORREÇÃO APLICADA AQUI:
  // A lógica para atualizar AddedIds deve estar dentro da função de callback do useEffect.
  useEffect(() => {
    // Atualiza os IDs adicionados sempre que os itens da lista mudam
    if (ListItems) { // Adicionada verificação para garantir que ListItems existe
      const ids = ListItems.map((item) => item.id);
      setAddedIds(ids);
    }
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Verifica se o ID do item está nos IDs adicionados
    return AddedIds.includes(itemId);
  };

  const DiscountPrice = (SubTotal * 0.2).toFixed(2);
  const TaxPrice = (SubTotal * 0.05).toFixed(2);

  const handlePromocode = (event) => {
    const value = event.target.value.replace(/\s+/g, "");
    setPromocode(value);
  };

  const totalPrice1 = (
    parseFloat(SubTotal) +
    parseFloat(TaxPrice) -
    parseFloat(DiscountPrice)
  ).toFixed(2);
  const totalPrice2 = (parseFloat(SubTotal) + parseFloat(TaxPrice)).toFixed(2);

  const TotalValue = (data) => {
    localStorage.setItem("TotalAmount", data);
  };

  return (
    <>
      <Navbar />

      <div className="entire-section">
        <p
          style={{ margin: 0 }}
          className={CartItems ? `cart-head animate` : `cart-head`}
        >
          Seu Carrinho
        </p>
        <div
          style={
            CartItems && CartItems.length === 0
              ? { height: "40vh" }
              : { height: "100%" }
          }
          className={CartItems ? `cart-section animate` : `cart-section`}
        >
          <div className="cart-details">
            <div
              style={
                CartItems && CartItems.length === 0
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="empty-cart"
            >
              <img src={Empty} className="empty-cart-img" alt="Carrinho Vazio" />
            </div>
            <div className="cart-item">
              {CartItems && CartItems.map((item) => { // Adicionada verificação para CartItems
                return (
                  <div className="cart-data" key={item.uniqueRenderKey || item.id}> {/* Prioriza uniqueRenderKey se existir, caso contrário usa item.id. Garanta que a chave seja de facto única. */}
                    <img
                      onClick={() => navigate(`/product/${item.id}`)}
                      src={item.image}
                      alt={item.title}
                      className="cart-item-img"
                    />
                    <div className="cart-all-data">
                      <p className="cart-title">{item.title}</p>
                      <div className="cart-price">
                        <p className="cart-discount">
                          R${(item.price * item.quantity).toFixed(2).replace('.',',')}
                        </p>
                        <p
                          style={
                            (item && item.category === "men's clothing") ||
                            item.category === "women's clothing"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="cart-size"
                        >
                          Tamanho: {item.size ? item.size : "Não selecionado"}
                        </p>
                      </div>
                      <div className="more-buttons">
                        <div className="quantity-section">
                          <button
                            onClick={() => dispatch(IncreaseQuantity(item.id))}
                            className="increase"
                          >
                            +
                          </button>
                          <p className="total-items">{item.quantity}</p>
                          <button
                            onClick={() => dispatch(DecreaseQuantity(item.id))}
                            className="decrease"
                            disabled={
                              item && item.quantity === 1 ? true : false
                            }
                          >
                            -
                          </button>
                        </div>
                        <div className="right-btns">
                          <div className="save-btn">
                            <img
                              onClick={() => {
                                if (!isAdded(item.id)) {
                                  dispatch(AddToList(item));
                                } else {
                                  dispatch(RemoveList(item.id));
                                }
                              }}
                              src={isAdded(item.id) ? saved : save}
                              className="save-img"
                              alt="Salvar item"
                            />
                            <p>Salvar</p>
                          </div>
                          <div className="delete-btn">
                            <img
                              onClick={() => dispatch(RemoveCart(item.id))}
                              src={Delete}
                              className="delete-img"
                              alt="Remover item"
                            />
                            <p>Remover</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={
              CartItems && CartItems.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
            className="checkout-section"
          >
            <div className="congrats">
              <p>
                Parabéns! Você tem direito a <b>Entrega Grátis</b>.
                <p style={{ marginTop: "5px", marginBottom: "0px" }}>
                  Use o código <b>SHUBHO20</b> para 20% de desconto.
                </p>
              </p>
            </div>
            <hr className="horizontal" />
            <div className="promocode">
              <input
                type="text"
                placeholder="Cupom de Desconto"
                onChange={handlePromocode}
                value={promocode}
              />
              <button
                onClick={() => {
                  if (promocode === "SHUBHO20") {
                    TotalValue(totalPrice1);
                    setdiscountCode(promocode);
                    setCorrectCode(true);
                  } else if (promocode !== "SHUBHO20") { // Pequena melhoria na lógica: else if em vez de apenas if
                    setdiscountCode(promocode);
                    TotalValue(totalPrice2);
                    setCorrectCode(false);
                  }
                }}
                className="promocode-btn"
              >
                Aplicar
              </button>
            </div>
            <p
              style={
                CorrectCode === true
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="applied"
            >
              <b>SHUBHO20</b> foi aplicado!
            </p>
            <p
              style={
                CorrectCode === false && discountCode !== ""
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="applied2"
            >
              Digite um cupom válido.
            </p>
            <hr className="horizontal" />

            <div className="money-data">
              <div className="money-1">
                <p className="total">Subtotal</p>
                <p className="total-price">R${SubTotal.toFixed(2).replace('.',',')}</p>
              </div>
              <div
                style={
                  CorrectCode === true
                    ? { display: "flex" }
                    : { display: "none" }
                }
                className="money-2"
              >
                <p className="item-discount">Desconto</p>
                <p className="item-discount2">(20%) - R${DiscountPrice.replace('.',',')}</p>
              </div>
              <div className="money-3">
                <p className="item-delivery">Entrega</p>
                <p className="item-delivery2">R$0,00</p>
              </div>
              <div className="money-4">
                <p className="item-tax">Imposto</p>
                <p className="item-tax2">(5%) + R${TaxPrice.replace('.',',')}</p>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="money-5">
              <p className="total">Total</p>
              <p
                style={
                  CorrectCode === true
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="total-price"
              >
                R${totalPrice1.replace('.',',')}
              </p>
              <p
                style={
                  CorrectCode !== true
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="total-price2"
              >
                R${totalPrice2.replace('.',',')}
              </p>
            </div>
            <div className="payment-btn">
              <button
                onClick={() => {
                  navigate("/payment");
                  if (CorrectCode === true) {
                    TotalValue(totalPrice1);
                  } else {
                    TotalValue(totalPrice2);
                  }
                }}
                className="payment"
              >
                Ir para Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default CartSection;
