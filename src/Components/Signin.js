import { React, useState, useEffect } from "react"; // Adicionado useEffect
import "./signin.css"; // Verifique se o caminho do CSS está correto
import Logo from "../imgs/logo2.png"; // Verifique se os caminhos das imagens estão corretos
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase"; // Verifique se o caminho está correto
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged, // Importar onAuthStateChanged
} from "firebase/auth";
import swal from "sweetalert";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const navigate = useNavigate();

  document.title = "Amazon"; // Pode ser "Login - Amazon" ou similar

  // Redireciona se já estiver logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home"); // Ou para a página principal do usuário
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (
      event.target.value === "" ||
      !event.target.value.includes("@") ||
      !event.target.value.includes(".") // Verificação de .com é muito específica, . já é um bom começo
    ) {
      setEmailError("Por favor, insira um endereço de e-mail válido."); // Traduzido
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError("Por favor, digite sua senha."); // Traduzido
    } else if (event.target.value.length < 6) { // Comum usar no mínimo 6 caracteres para senha
      setPasswordError("A senha é muito curta."); // Traduzido
    } else {
      setPasswordError("");
    }
  };

  const LogInUser = async () => {
    // Limpa erros anteriores antes de tentar o login
    setEmailError("");
    setPasswordError("");

    if (email === "" || password === "") {
        swal({
            title: "Atenção!", // Traduzido
            text: "Por favor, preencha e-mail e senha.", // Traduzido
            icon: "warning", // Mudado para warning
            buttons: "Ok",
        });
        return;
    }
    if (emailError || PasswordError) {
        swal({
            title: "Atenção!",
            text: "Por favor, corrija os erros indicados.", // Traduzido
            icon: "warning",
            buttons: "Ok",
        });
        return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O onAuthStateChanged vai lidar com o redirecionamento
      // navigate("/home"); // Removido daqui, pois o listener onAuthStateChanged já faz isso
    } catch (error) {
      let friendlyMessage = "Ocorreu um erro ao tentar fazer login. Verifique suas credenciais."; // Traduzido
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        friendlyMessage = "E-mail ou senha inválidos. Por favor, tente novamente."; // Traduzido
      } else if (error.code === 'auth/invalid-email') {
        friendlyMessage = "O formato do e-mail é inválido."; // Traduzido
      }
      swal({
        title: "Erro!", // Traduzido
        text: friendlyMessage,
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  const GoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      // O onAuthStateChanged vai lidar com o redirecionamento
      // navigate("/home"); // Removido daqui
    } catch (error) {
      swal({
        title: "Erro!", // Traduzido
        text: error.message, // Pode-se traduzir códigos de erro comuns do Google também
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  // Efeito para carregar imagens de fundo e evitar mostrar o formulário antes
  useEffect(() => {
    const images = [BG1, BG2];
    let loadedCount = 0;
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                setBgLoaded(true);
            }
        };
        img.onerror = () => { // Caso alguma imagem falhe ao carregar
            loadedCount++;
            if (loadedCount === images.length) {
                setBgLoaded(true); // Ainda mostra o formulário se uma imagem falhar
            }
        }
    });
  }, []);


  return (
    <>
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" alt="Logo Amazon" /> {/* Adicionado alt */}
          </div>
          <div className="signup">
            <Link to="/signup">
              <button className="signup-btn">Cadastre-se</button> {/* Traduzido */}
            </Link>
          </div>
        </div>
        <div className="background">
          <img src={BG1} className="BG1" alt="Imagem de fundo 1" style={{opacity: bgLoaded ? 1 : 0, width: '34%'}} /> {/* Tamanho e opacidade controlados */}
          <img src={BG2} className="BG2" alt="Imagem de fundo 2" style={{opacity: bgLoaded ? 1 : 0, width: '34%'}} /> {/* Tamanho e opacidade controlados */}
        </div>
        {!bgLoaded && <div className="loading-background-placeholder">Carregando...</div>} {/* Placeholder de carregamento */}

        {bgLoaded && (
          <div className="main-form">
            <div className="login-form">
              <div className="some-text">
                <p className="user">Login de Usuário</p> {/* Traduzido */}
                <p className="user-desc">
                  Olá! Insira seus dados para entrar na sua conta.
                </p> {/* Traduzido */}
              </div>
              <div className="user-details">
                <input
                  type="email"
                  placeholder="Digite seu E-mail" // Traduzido
                  className="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
                <input
                  type="password"
                  placeholder="Senha" // Traduzido
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                {PasswordError && (
                  <div className="error-message">{PasswordError}</div>
                )}
                <button onClick={LogInUser} className="signin-btn">
                  Entrar {/* Traduzido */}
                </button>
                <div className="extra-buttons">
                  <p className="or">&#x2015; Ou &#x2015;</p> {/* Mantido */}
                  <button onClick={GoogleAuth} className="google">
                    <p>Entrar com</p> {/* Traduzido */}
                    <img src={google} className="google-img" alt="Logo Google" /> {/* Adicionado alt */}
                  </button>
                </div>
                 <div className="forgot-password">
                  <Link to="/forgot-password">Esqueceu sua senha?</Link> {/* Adicionado e Traduzido */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signin;
