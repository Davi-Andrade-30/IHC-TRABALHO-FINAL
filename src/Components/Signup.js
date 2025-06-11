import { React, useState, useEffect } from "react"; // useEffect importado
import "./signin.css"; // Presumo que o estilo seja compartilhado ou similar ao signin.css
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";
import { app } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged, // Importar onAuthStateChanged
} from "firebase/auth";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);
  const [PasswordError, setPasswordError] = useState("");
  const [NameError, setNameError] = useState("");

  document.title = "Cadastro - Amazon"; // Traduzido

  const navigate = useNavigate();

  // Redireciona se já estiver logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home"); // Ou para a página principal do usuário
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const notifyError = (message) => // Função de notificação de erro genérica
    toast.error(message, {
      position: "top-center",
      autoClose: 2000, // Aumentado o tempo
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (
      event.target.value === "" ||
      !event.target.value.includes("@") ||
      !event.target.value.includes(".") // Verificação de .com é muito específica
    ) {
      setEmailError("Por favor, insira um endereço de e-mail válido."); // Traduzido
    } else {
      setEmailError("");
    }
  };

  const handleNameBlur = (event) => {
    if (event.target.value === "") {
      setNameError("Por favor, digite seu nome."); // Traduzido
    } else {
      setNameError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError("Por favor, digite sua senha."); // Traduzido
    } else if (event.target.value.length < 6) { // Comum usar no mínimo 6 caracteres
      setPasswordError("A senha é muito curta (mínimo 6 caracteres)."); // Traduzido e especificado
    } else {
      setPasswordError("");
    }
  };

  const CreateUser = async () => {
    // Limpa erros anteriores e valida os campos antes de tentar
    setEmailError("");
    setNameError("");
    setPasswordError("");

    let hasError = false;
    if (name === "") {
        setNameError("Por favor, digite seu nome.");
        hasError = true;
    }
    if (email === "" || !email.includes("@") || !email.includes(".")) {
        setEmailError("Por favor, insira um endereço de e-mail válido.");
        hasError = true;
    }
    if (password === "" || password.length < 6) {
        setPasswordError("A senha deve ter no mínimo 6 caracteres.");
        hasError = true;
    }

    if (hasError) {
        notifyError("Por favor, preencha todos os campos corretamente!"); // Traduzido
        return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { // Usar userCredential.user
        displayName: name,
      });
      // O onAuthStateChanged cuidará do redirecionamento para /home
      // navigate("/home"); // Removido, pois onAuthStateChanged já lida com isso
    } catch (error) {
      let friendlyMessage = "Ocorreu um erro ao tentar criar a conta."; // Traduzido
      if (error.code === 'auth/email-already-in-use') {
        friendlyMessage = "Este endereço de e-mail já está em uso."; // Traduzido
      } else if (error.code === 'auth/invalid-email') {
        friendlyMessage = "O formato do e-mail é inválido."; // Traduzido
      } else if (error.code === 'auth/weak-password') {
        friendlyMessage = "A senha é muito fraca. Tente uma mais forte."; // Traduzido
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
      // O onAuthStateChanged cuidará do redirecionamento
      // navigate("/home"); // Removido
    } catch (error) {
      swal({
        title: "Erro!", // Traduzido
        text: "Ocorreu um erro ao tentar login com o Google.", // Mensagem genérica traduzida
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  // Efeito para carregar imagens de fundo
  useEffect(() => {
    const images = [BG1, BG2];
    let loadedCount = 0;
    const imageLoadPromises = images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Resolve mesmo em erro para não bloquear
        });
    });

    Promise.all(imageLoadPromises).then(() => {
        setBgLoaded(true);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="signin-page"> {/* Reutilizando a classe, ajuste o CSS se necessário */}
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" alt="Logo Amazon" /> {/* Adicionado alt */}
          </div>
          <div className="signup"> {/* Mantido nome da classe, mas botão agora é "Entrar" */}
            <Link to="/"> {/* Link para a página de login */}
              <button className="signup-btn">Entrar</button> {/* Traduzido */}
            </Link>
          </div>
        </div>
        <div className="background">
          <img src={BG1} className="BG1" alt="Imagem de fundo 1" style={{opacity: bgLoaded ? 1 : 0, width: '34%'}} /> {/* Tamanho e opacidade controlados */}
          <img src={BG2} className="BG2" alt="Imagem de fundo 2" style={{opacity: bgLoaded ? 1 : 0, width: '34%'}} /> {/* Tamanho e opacidade controlados */}
        </div>
        {!bgLoaded && <div className="loading-background-placeholder">Carregando...</div>} {/* Placeholder */}

        {bgLoaded && (
          <div className="main-form2"> {/* main-form2 pode precisar de ajustes no CSS se for diferente do main-form */}
            <div className="login-form">
              <div className="some-text">
                <p className="user">Cadastro de Usuário</p> {/* Traduzido */}
                <p className="user-desc">
                  Olá! Insira seus dados para criar uma nova conta.
                </p> {/* Traduzido */}
              </div>
              <div className="user-details">
                <input
                  type="text"
                  placeholder="Nome Completo" // Traduzido
                  className="name" // Classe CSS
                  value={name}
                  onBlur={handleNameBlur}
                  onChange={handleNameChange}
                  required
                />
                {NameError && <div className="error-message">{NameError}</div>}
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
                  placeholder="Crie uma Senha" // Traduzido
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                {PasswordError && (
                  <div className="error-message">{PasswordError}</div>
                )}
                <button
                  onClick={CreateUser} // Removida a lógica de validação daqui, agora está no início da função CreateUser
                  className="signin-btn" // Classe CSS
                >
                  Cadastrar {/* Traduzido */}
                </button>
                <div className="extra-buttons">
                  <p className="or">&#x2015; Ou &#x2015;</p>
                  <button onClick={GoogleAuth} className="google">
                    <p>Cadastrar com</p> {/* Traduzido */}
                    <img src={google} className="google-img" alt="Logo Google" /> {/* Adicionado alt */}
                  </button>
                </div>
                <div className="login-instead"> {/* Link para login */}
                    Já tem uma conta? <Link to="/">Faça login</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;