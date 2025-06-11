import React from "react";
import "./footer.css"; // Mantenha seu arquivo CSS
import Logo from "../imgs/logo2.png"; // Mantenha o caminho da sua logo

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="disclaimer-area">
          <p className="disclaimer-desc">
            <b>Aviso Legal:</b> Trabalhinho dos cria de IHC
          </p>
        </div>
      </div>
      <div className="extra-data">
        <div className="link-section">
          <div className="first-row">
            <p className="bold">Conheça-nos</p>
            <p>Ganhe Dinheiro Conosco</p>
            <p>Pagamentos pela Amazon</p> {/* Ou "Formas de Pagamento Amazon" */}
            <p>Deixe-nos Ajudar Você</p>
          </div>
          <div className="second-row">
            <p className="bold">Sobre a Amazon</p>
            <p>Venda produtos na Amazon</p>
            <p>Cartão Amazon Business</p>
            <p>Amazon e COVID-19</p>
          </div>
          <div className="third-row">
            <p className="bold">Conecte-se Conosco</p>
            <p>Venda aplicativos na Amazon</p>
            <p>Compre com Pontos</p>
            <p>Taxas e Políticas de Envio</p>
          </div>
          <div className="fourth-row">
            <p className="bold">Amazon Cuida</p> {/* Ou "Responsabilidade Social Amazon" */}
            <p>Torne-se um Afiliado</p>
            <p>Recarregue Seu Saldo</p>
            <p>Devoluções e Trocas</p>
          </div>
        </div>
        {/* Mantendo a estrutura de link-section2 caso seja usada para layout responsivo diferente */}
        <div className="link-section2">
          <div className="first-one">
            <div className="first-row">
              <p className="bold">Conheça-nos</p>
              <p>Ganhe Dinheiro Conosco</p>
              <p>Pagamentos pela Amazon</p>
              <p>Deixe-nos Ajudar Você</p>
            </div>
            <div className="second-row">
              <p className="bold">Sobre a Amazon</p>
              <p>Venda produtos na Amazon</p>
              <p>Cartão Amazon Business</p>
              <p>Amazon e COVID-19</p>
            </div>
          </div>
          <div className="second-one">
            <div className="third-row">
              <p className="bold">Conecte-se Conosco</p>
              <p>Venda aplicativos na Amazon</p>
              <p>Compre com Pontos</p>
              <p>Taxas e Políticas de Envio</p>
            </div>
            <div className="fourth-row">
              <p className="bold">Amazon Cuida</p>
              <p>Torne-se um Afiliado</p>
              <p>Recarregue Seu Saldo</p>
              <p>Devoluções e Trocas</p>
            </div>
          </div>
        </div>
        <div className="developer">
          <img src={Logo} className="amazon-img" alt="Logo Amazon" /> {/* Adicionado alt text */}
          <div className="dev-data">
            <p>&copy; 2023 | Desenvolvido por </p>
            <a
              className="dev-link"
              href="https://github.com/Davi-Andrade-30" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Davi Andrade
            </a>
            <a
              className="dev-link"
              href="https://github.com/LGAP159" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Luigi Gomes
            </a>
            <a
              className="dev-link"
              href="https://github.com/BunocGomes" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Bruno Ricardo
            </a>
            <a
              className="dev-link"
              href="https://github.com/klevertonfilipe" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Kleverton Filipe
            </a>
            <a
              className="dev-link"
              href="https://github.com/Rafaelpbnc16" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Rafael Pires
            </a>
            <a
              className="dev-link"
              href="https://github.com/Coluno" // Mantenha o link original
              target="_blank"
              rel="noopener noreferrer" // Adicionado por segurança e boas práticas
            >
              Gabriel Canuto
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
