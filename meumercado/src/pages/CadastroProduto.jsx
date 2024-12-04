// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

//Importação do navigate pra transitar entre páginas
import { useNavigate } from "react-router-dom";

// Url da api
const urlCate = "http://localhost:5000/raca";
const urlProd = "http://localhost:5000/animais";

const CadastroProduto = () => {
  //Lista com categorias
  const [Racas, setRacas] = useState([]);
  //UseEffect pra puxar os dados da api
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(urlCate);
        const cate = await req.json();
        console.log(cate);
        setRacas(cate);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  //Link produto sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  //Variáveis para o produto
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("animal");
  const [vacinado, setVacinado] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  //Variáveis para o alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // Criando o navigate
  const navigate = useNavigate();

  //Função pra lidar com o envio dos dados
  const handleSubmit = async (e) => {
    // Previne a página de ser recarregada
    e.preventDefault();
  
    if (nome !== "") {
      if (vacinado !== "") {
        const produto = { nome, raca, vacinado, imagemUrl };
        console.log(produto);
        try {
          const req = await fetch(urlProd, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(produto),
          });
          const res = await req.json();
          console.log(res);
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success");
          setAlertMensagem("Produto cadastrado com sucesso");
          alert("Produto cadastrado com sucesso");
          navigate("/home"); // Redireciona para a página inicial
        } catch (error) {
          console.log(error);
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo preço não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo nome não pode ser vazio");
    }
  };
  

  return (
    <div>
      <NavBarra />
      <Container>
        <br />
        <h1>Cadastrar Animal</h1>
        <br />
        <form className="mt-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              {/* Caixinha de nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </FloatingLabel>

              {/* Select de categorias */}
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de animal </Form.Label>
                <Form.Select
                  value={raca}
                  onChange={(e) => {
                    setRaca(e.target.value);
                  }}
                >
                  {Racas.map((cat) => (
                    <option key={cat.id} value={cat.nome}>
                      {cat.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Caixinha de preço */}
              <FloatingLabel
                controlId="floatingInputVacinado"
                label="Vacinado"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o sim ou não pra vacinado"
                  value={vacinado}
                  onChange={(e) => {
                    setVacinado(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                {/* Caixinha de imagem */}
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="Envie o link da imagem do produto"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Envie o link da imagem do produto"
                    value={imagemUrl}
                    onChange={(e) => {
                      setImagemUrl(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <Image
                  src={imagemUrl == "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          <Button className="btn-yellow" size="lg" type="submit">
        Cadastrar
        </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroProduto;
