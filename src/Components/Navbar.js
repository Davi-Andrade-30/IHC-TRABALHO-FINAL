import { React, useEffect, useState, useRef } from "react";
import Logo from "../imgs/logo.png";
import LogoSmall from "../imgs/A-logo.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import orders from "../imgs/orders.png";
import Default from "../imgs/default.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import swal from "sweetalert";

const auth = getAuth(app);

function Navbar() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const OrderItems = useSelector((state) => state.OrderAdded.OrderItems);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [Products, setProducts] = useState([]);

  const navigate = useNavigate();

  const searchResultsRef = useRef(null);

  const totalLength = OrderItems.reduce((acc, item) => {
    // if the item is an array, add its length to the accumulator
    if (Array.isArray(item)) {
      return acc + item.length;
    }
    // otherwise, just add 1 to the accumulator
    return acc + 1;
  }, 0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

// Assumindo que você tenha as funções setProducts e setLoading (opcional) do seu estado do React.

const GetProducts = async () => {
  // Opcional: ativar o indicador de carregamento
  // setLoading(true);

  try {
    // 1. Criar um array com três promessas de busca para a categoria "electronics"
    const fetchPromises = [
      fetch("https://fakestoreapi.com/products/category/electronics"),
    ];

    // 2. Aguardar todas as buscas serem concluídas em paralelo
    const responses = await Promise.all(fetchPromises);

    // 3. Transformar todas as respostas em JSON
    const jsonDataPromises = responses.map(response => {
      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    });
    const allJsonData = await Promise.all(jsonDataPromises);

    // 4. Combinar os três arrays de produtos em um só
    const combinedData = allJsonData.flat();

    // 5. Adicionar uma chave única para cada item (essencial para o React)
    let counter = 0;
    const productsWithUniqueKey = combinedData.map(item => ({
      ...item,
      uniqueKey: `${item.id}-${counter++}`
    }));

    // 6. Atualizar o estado com a lista triplicada
    setProducts(productsWithUniqueKey);

  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos:", error);
    // Opcional: atualizar um estado de erro para exibir uma mensagem na tela
    // setError(error);
  } finally {
    // Opcional: desativar o indicador de carregamento
    // setLoading(false);
  }
};

// Chamar a função para executar a busca
GetProducts();

    const handleClick = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchText("");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const searchResults = Products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalQuantity = CartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is still pending!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate({ pathname: "/home" });
                  }
                });
              } else {
                navigate({ pathname: "/home" });
              }
            }}
            src={Logo}
            className="logo"
          />
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is still pending!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate({ pathname: "/home" });
                  }
                });
              } else {
                navigate({ pathname: "/home" });
              }
            }}
            src={LogoSmall}
            className="logo2"
          />

          <div className="search-bar">
            <input
              type="text"
              className="search-box"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn">
              <img src={search} className="search-img" />
            </button>
          </div>
        </div>
        <div className="right-section">
          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is still pending!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/wishlists");
                  }
                });
              } else {
                navigate("/wishlists");
              }
            }}
            src={wishlist}
            className="wishlist"
          />
          <p
            style={
              ListItems && ListItems.length > 0
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="list-count"
          >
            {ListItems.length}
          </p>

          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is still pending!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/cart");
                  }
                });
              } else {
                navigate("/cart");
              }
            }}
            src={cart}
            className="cart"
          />

          <p
            style={
              CartItems && CartItems.length > 0
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="cart-count"
          >
            {totalQuantity}
          </p>

          <img
            onClick={() => {
              if (window.location.href.includes("/payment")) {
                swal({
                  title: "Are you sure?",
                  text: "Your transaction is still pending!",
                  icon: "warning",
                  buttons: ["Cancel", "Yes"],
                }).then((willNavigate) => {
                  if (willNavigate) {
                    navigate("/orders");
                  }
                });
              } else {
                navigate("/orders");
              }
            }}
            src={orders}
            className="orders"
          />
          <p
            style={
              OrderItems && OrderItems.length > 0
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="order-count"
          >
            {totalLength}
          </p>

          <img
            onClick={() => navigate("/account")}
            src={
              user && user.photoURL
                ? user.photoURL.replace(/^http:\/\//i, "https://") //replaces the http with https
                : Default
            }
            className="default"
          />
        </div>
        <div className="search-bar2">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn">
            <img src={search} className="search-img" />
          </button>
        </div>
      </div>

      {searchText !== "" && (
        <div
          ref={searchResultsRef}
          className={`search-results ${searchResults.length ? "show" : ""}`}
        >
          {searchResults.length > 0 &&
            searchResults.map((product) => (
              <div
                onClick={() => {
                  if (window.location.href.includes("/payment")) {
                    swal({
                      title: "Are you sure?",
                      text: "Your transaction is still pending!",
                      icon: "warning",
                      buttons: ["Cancel", "Yes"],
                    }).then((willNavigate) => {
                      if (willNavigate) {
                        navigate(`/product/${product.id}`);
                      }
                    });
                  } else {
                    navigate(`/product/${product.id}`);
                  }
                }}
                className="search-results2"
                key={product.id}
              >
                <div className="product-img">
                  <img src={product.image} className="product-image" />
                </div>
                <div className="product-data">
                  <p className="product-title">
                    {product.title.length > 50
                      ? product.title.slice(0, 50) + "..."
                      : product.title}
                  </p>
                  <p className="product-desc">
                    {product.description.length > 50
                      ? product.description.slice(0, 50) + "..."
                      : product.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
