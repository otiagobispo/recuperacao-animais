import React, { useState } from "react";
import { Button, FloatingLabel, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const navigate = useNavigate();

  // Função para salvar usuário no db.json
  const gravarUsuario = async () => {
    const novoUsuario = { nome, email, senha };
    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("Erro ao cadastrar usuário.");
      return false;
    }
    return true;
  };

  // Função para tratar o cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    // Validação dos campos
    if (!nome || !email || !senha || !confirmarSenha) {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("Todos os campos são obrigatórios.");
      return;
    }
    if (senha !== confirmarSenha) {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("As senhas não coincidem.");
      return;
    }
    // Salva o usuário no db.json
    const sucesso = await gravarUsuario();
    if (sucesso) {
      setAlertClass("mb-3 mt-2");
      setAlertVariant("success");
      setAlertMensagem("Cadastro realizado com sucesso.");
      alert("Cadastro realizado com sucesso");
      // Redireciona para a página de login
      navigate("/login");
    }
  };

  return (
    <div>
      <Container style={{ height: "100vh" }} className="justify-content-center align-content-center">
        <img
          src="https://www.softisa.com.br/wp-content/uploads/2020/01/Logo-Doce-Del%C3%ADcia.png"  
          style={{ width: "300px", marginBottom: "50px" }} 
        />
        <Form style={{ width: "75%", margin: "auto" }} onSubmit={handleCadastro}>
          {/* Campo nome */}
          <FloatingLabel controlId="floatingNome" label="Nome do Funcionário" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FloatingLabel>
          {/* Campo email */}
          <FloatingLabel controlId="floatingEmail" label="Email do Funcionário" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          {/* Campo senha */}
          <FloatingLabel controlId="floatingSenha" label="Senha do Funcionário" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FloatingLabel>
          {/* Campo confirmar senha */}
          <FloatingLabel controlId="floatingConfirmarSenha" label="Confirmar Senha do Funcionário" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </FloatingLabel>
          {/* Alerta de erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>
          {/* Botão de cadastrar*/}
          <Button variant="warning" type="submit" className="mt-4" size="lg">
            Cadastrar funcionário 
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Cadastro;
