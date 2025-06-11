import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./profile.css"; // Verifique se o caminho do CSS está correto
import { app } from "../Firebase"; // Verifique se o caminho está correto
import Default from "../imgs/default.png"; // Verifique se os caminhos das imagens estão corretos
import USER from "../imgs/user.png";
import contact from "../imgs/contact.png";
import LowerNav from "./LowerNav";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  document.title = "Seu Perfil"; // Traduzido

  const checkDP = () => {
    if (user && user.photoURL && user.photoURL.includes("https")) {
      setImage(user.photoURL);
    } else if (user && user.photoURL && user.photoURL.includes("http")) {
      const newImage = user.photoURL.replace(/^http:\/\//i, "https://");
      setImage(newImage);
    } else {
      setImage(Default);
    }
  };

  useEffect(() => {
    checkDP();
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Adicionado unsubscribe
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Função de limpeza para o listener
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={user ? { height: "fit-content", minHeight: "calc(100vh - 120px)" } : { height: "70vh", minHeight: "calc(100vh - 120px)" }} // Adicionado minHeight
        className="profile-section"
      >
        <div className={user ? `account-section animate` : `account-section`}>
          <div className="top-section">
            <p className="welcome-mssg">
              {user ? `Bem-vindo(a), ${user.displayName || 'Usuário'}` : ""} {/* Traduzido e adicionado fallback para displayName */}
            </p>
          </div>
          <div className="account-section2">
            <div className="left-account-section">
              <img src={image} className="profile-img" alt="Foto do perfil" /> {/* Adicionado alt */}
              <p className="profile-name">
                {user ? `${user.displayName || 'Usuário Sem Nome'}` : ""} {/* Adicionado fallback */}
              </p>
              <p className="profile-email">{user ? `${user.email}` : ""}</p>
              <button
                onClick={() => {
                  signOut(auth);
                  setTimeout(() => {
                    navigate("/signup"); // Verifique se /signup é a rota correta para deslogar/registrar
                  }, 700);
                }}
                className="signout-btn"
              >
                Sair {/* Traduzido */}
              </button>
            </div>
            <div className="right-account-section">
              <p className="personal-info-head">Informações Pessoais</p> {/* Traduzido */}
              <p className="personal-info-desc">
                Gerencie suas informações pessoais, incluindo seus dados de
                contato.
              </p> {/* Traduzido */}
              <div className="personal-user-data">
                <div className="personal-name">
                  <div className="name-section">
                    <p className="name-data">Nome</p> {/* Traduzido */}
                    <img src={USER} className="user-photo" alt="Ícone de usuário" /> {/* Adicionado alt */}
                  </div>
                  <p className="users-name">
                    {user ? `${user.displayName || 'Não informado'}` : ""} {/* Adicionado fallback */}
                  </p>
                </div>
                <div className="personal-mail">
                  <div className="mail-section">
                    <p className="mail-data">Contato</p> {/* Traduzido */}
                    <img src={contact} className="mail-photo" alt="Ícone de contato" /> {/* Adicionado alt */}
                  </div>
                  {/* Não é ideal truncar o email assim, pode esconder informação importante. 
                      Se o layout quebrar, é melhor ajustar o CSS. 
                      Mas mantendo a lógica original por enquanto. */}
                  <p className="users-mail">{user ? `${user.email}` : ""}</p>
                </div>
              </div>
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

export default Profile;
