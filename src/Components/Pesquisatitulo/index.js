import React from "react";
// import axios from "axios";
import { useState } from "react";
import Modal from './Modal';
import "./index.css";


export default function Pesquisatitulo(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null);

  const pegaPesquisa = (event) => {
    event.preventDefault();
    props.apareceCards()
    props.setTituloPesquisa(titulo);
    props.setPaisPesquisa(selectedCountry.countryCode);
    props.roda()
    console.log("Título:", titulo);
    console.log("País selecionado:", selectedCountry.countryCode);
  };

  const pegaTitulo = (event) => {
    setTitulo(event.target.value)
  }

  return (
  <form method="post" onSubmit={pegaPesquisa} className="header">
    <input id="titulo" type="text" name="titulo" placeholder="Selecionar título" onChange={pegaTitulo} value={titulo} />
    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} setSelectedCountry={setSelectedCountry} />
    <input type="submit" value="PESQUISAR" className="bold-text"/>
  </form>
  );
}
