import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

const NavBarra = () => {
  const usuarioNome = localStorage.getItem("userName");

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [activeButton, setActiveButton] = useState(location.pathname);

  if (isLoginPage) {
    return null;
  }

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="white">
        <Container>
          {/* Logo da empresa */}
          <Navbar.Brand href="/home" className="d-flex align-items-center">
          <span class="material-symbols-outlined">
pets
</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="minha-nav" />

          <Navbar.Collapse id="minha-nav" className="justify-content-center">
           
            <Nav>
              <Nav.Link
                href="/home"
                onClick={() => handleButtonClick("/home")}
                className={`nav-item ${
                  activeButton === "/home" ? "active-button" : ""
                }`}
              >
                Páginas de animal
              </Nav.Link>
              <Nav.Link
                href="/produto/cadastrar"
                onClick={() => handleButtonClick("/produto/cadastrar")}
                className={`nav-item ${
                  activeButton === "/produto/cadastrar" ? "active-button" : ""
                }`} 
              >
                Cadastrar animal
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Área do usuário e sair */}
          <Nav className="ms-auto d-flex align-items-center">
            <Navbar.Text className="me-2" style={{ color: "dark" }}>
              Usuário: {usuarioNome}
            </Navbar.Text>
            <Nav.Link
              href="/login"
              className="logout-button"
              style={{
                backgroundColor: "#1E90FF", 
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "",
                textAlign: "center",
              }}
            >
              Sair
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Estilo do botão ativo */}
      <style jsx>{`
        .active-button {
          background-color: #1E90FF !important;
          color: #fff !important;
          border-radius: 5px;
        }
        .nav-item {
          margin: 0 10px;
        }
        .logout-button:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
      `}</style>
    </div>
  );
};

export default NavBarra;
