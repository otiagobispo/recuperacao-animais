import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavBarra from "../components/NavBarra";
import CardProduto from "../components/CardProduto";

// URL da API
const url = "http://localhost:5000/animais"; // Certifique-se de ajustar o endpoint para animais

const Home = () => {
  const [animais, setAnimais] = useState([]);

  // Fetch dos dados da API
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const data = await req.json();
        setAnimais(data);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Funções de ação
  const handleAdopt = (id) => {
    setAnimais((prevAnimais) => prevAnimais.filter((animal) => animal.id !== id));
    alert("Animal adotado com sucesso!");
  };

  const handleEdit = (id) => {
    const animalToEdit = animais.find((animal) => animal.id === id);
    alert(`Editar informações de: ${animalToEdit.nome}`);
    // Implementar a lógica de edição
  };

  return (
    <div>
      <NavBarra />
      <br />
      <h1>Animais Disponíveis</h1>
      <br />
      <Container>
        <div className="lista-animais d-flex col-12 gap-2 mt-3 justify-content-start flex-wrap">
          {/* Renderizando cartões de animais usando o CardProduto */}
          {animais.map((animal) => (
            <CardProduto
              id={animal.id}
              raca={animal.raca}
              vacinado={animal.vacinado}
              imagemUrl={animal.imagemUrl}
              onAdopt={handleAdopt}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
