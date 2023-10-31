import './App.css';
import Card from "./Components/Card";
import Pesquisatitulo from "./Components/Pesquisatitulo/index.js";
import { useState } from "react";


function App() {
  const [apareceCards, setApareceCards] = useState(false);
  const [tituloPesquisa, setTituloPesquisa] = useState("")
  const [paisPesquisa, setPaisPesquisa] = useState(null);
  const [rodaAPI, setRodaAPI] = useState(false);
  

  return (
    apareceCards ? (
      <div className="App">
        <Pesquisatitulo apareceCards={() => setApareceCards(true)} setTituloPesquisa={setTituloPesquisa} setPaisPesquisa={setPaisPesquisa} roda={() => setRodaAPI(true)}/>
        <Card titulo={tituloPesquisa} pais={paisPesquisa} rodaAPI={rodaAPI} paraDeRodar={() => setRodaAPI(false)}/>
      </div>
      ) : (  
      <div className="background-image">
        <div className="big-text">
          Find where to watch <br /> any movie you want.
        </div>
        <Pesquisatitulo apareceCards={() => setApareceCards(true)} setTituloPesquisa={setTituloPesquisa} setPaisPesquisa={setPaisPesquisa} roda={() => setRodaAPI(true)}/>
      </div>
      )

  );
}

export default App;