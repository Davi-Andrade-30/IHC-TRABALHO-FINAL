import React, { useState, useEffect } from "react";
import { AddToList, RemoveList } from "../action/List"; // Verifique se os caminhos estão corretos
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom"; // NavLink também foi importado
import Added from "../imgs/red-heart.png"; // Verifique se os caminhos das imagens estão corretos
import Add from "../imgs/heart.png";
import Footer from "./Footer";
import rating from "../imgs/rating.png";
import Navbar from "./Navbar";
import empty from "../imgs/empty.png";
import LowerNav from "./LowerNav";
import "./lists.css"; // Verifique se o caminho do CSS está correto

function Lists() {
  const [AddedIds, setAddedIds] = useState([]);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();

  document.title = "Sua Lista de Desejos"; // Traduzido

  useEffect(() => {
    // Atualiza os IDs adicionados sempre que os itens da lista mudam
    if (ListItems) {
      const ids = ListItems.map((item) => item.id);
      setAddedIds(ids);
    }
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Verifica se o ID do item está nos IDs adicionados
    return AddedIds.includes(itemId);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 120px)" }} className="content"> {/* Ajustado para minHeight e um cálculo para o footer */}
        <div className={ListItems ? `lists animate` : `lists`}>
          <p className="wishlist-head">Sua Lista de Desejos</p> {/* Traduzido */}
          <div
            style={
              ListItems && ListItems.length === 0 ? { display: "flex" } : { display: "none" }
            }
            className="empty-list"
          >
            <img src={empty} className="empty-img" alt="Lista vazia"/> {/* Adicionado alt */}
            <div className="empty-text">
              <p className="empty-head">Sua lista está vazia!</p> {/* Traduzido */}
              <p className="empty-desc">
                "Não deixe sua lista de desejos acumular poeira. Adicione alguns itens que trazem
                alegria para sua vida e veja como eles se tornam realidade com apenas
                alguns cliques."
              </p> {/* Traduzido */}
              <Link to="/home"> {/* Verifique se /home é a rota correta para sua página inicial/produtos */}
                <button className="shopping">Ir às Compras</button> {/* Traduzido */}
              </Link>
            </div>
          </div>
          <div className="lists-items">
            {ListItems &&
              ListItems.length > 0 &&
              ListItems.map((items) => {
                return (
                  <div className="card" key={items.uniqueRenderKey || items.id}> {/* Prioriza uniqueRenderKey */}
                    <div className="card-img-data">
                      <img src={items.image} className="card-img" alt={items.title} /> {/* Adicionado alt */}
                      <img
                        onClick={() => {
                          if (!isAdded(items.id)) {
                            dispatch(AddToList(items));
                          } else {
                            dispatch(RemoveList(items.id));
                          }
                        }}
                        src={isAdded(items.id) ? Added : Add}
                        className="add-list2"
                        alt={isAdded(items.id) ? "Remover da lista" : "Adicionar à lista"} // Adicionado alt dinâmico
                      />
                      <NavLink to={`/product/${items.id}`} className="view-product-link"> {/* Removida key duplicada, NavLink já é um link */}
                        <button className="view">Ver produto</button> {/* Traduzido */}
                      </NavLink>
                    </div>
                    <div className="card-data">
                      <p className="card-title">
                        {items.title && items.title.length >= 32 // Adicionada verificação para items.title
                          ? items.title.slice(0, 32) + "..."
                          : items.title}
                      </p>
                      <div className="category-rating">
                        <p className="card-category">{items.category}</p>
                        <div className="rating">
                          <img src={rating} className="rating-img" alt="Estrela de avaliação"/> {/* Adicionado alt */}
                          <img src={rating} className="rating-img" alt="Estrela de avaliação"/>
                          <img src={rating} className="rating-img" alt="Estrela de avaliação"/>
                          <img src={rating} className="rating-img" alt="Estrela de avaliação"/>
                          <img src={rating} className="rating-img" alt="Estrela de avaliação"/>
                          <p className="rating-text">5</p> {/* Considere tornar isso dinâmico se houver dados de avaliação */}
                        </div>
                      </div>
                      <div className="card-price">
                        <p className="discount">R${typeof items.price === 'number' ? items.price.toFixed(2).replace('.', ',') : '0,00'}</p> {/* Formato BRL e verificação */}
                        <p className="mrp">R${typeof items.price === 'number' ? Math.round(items.price * 1.66).toFixed(2).replace('.', ',') : '0,00'}</p> {/* Formato BRL e verificação */}
                        <p className="price-off">(60% OFF)</p> {/* Este valor de desconto parece fixo, pode precisar de ajuste */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="lowerNav">
          <LowerNav />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Lists;
