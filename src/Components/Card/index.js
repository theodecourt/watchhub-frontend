import React from "react";
import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";



const options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/search/title',
  params: {
    title: 'Barbie',
    country: 'us',
    show_type: 'all',
    output_language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '579281897emsh659eb180b175647p19145cjsn5f9708de3429',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

export default function Card(props) {
  const [titulosFilmes, setTitulosFilmes] = useState([])
  const [generosFilmes, setGenerosFilmes] = useState([])
  const [streamingsFilmes, setStreamingsFilmes] = useState([])
  const [linksFilmes, setLinksFilmes] = useState([])
  const pais = props.pais

  async function fetchData() {  
      try {
        const response = await axios.request(options);
        var n = 0;
        var contador = 0;
        var titulos = []
        var listaGeral = []
        var geralStreaming = []
        var geralLinks = []
        while (contador < 8) {
          //titulo
          let titulo = response.data.result[n]['title']
          if (!titulos.includes(titulo) && response.data.result[n]['streamingInfo'][pais]) {
            titulos.push(titulo)          
          
            //generos
            let generos = response.data.result[n]['genres']
            var listaGeneros = [];
            for (var i = 0; i < generos.length; i++) {
              if (!listaGeneros.includes(generos[i]['name'])) {
                listaGeneros.push(generos[i]['name'])
              }
            }
            listaGeral.push(listaGeneros)
      
            //streaming e link
            let streamings = response.data.result[n]['streamingInfo'][pais]
            var listaStreamings = [];
            var listaLinks = [];
            for (var i = 0; i < streamings.length; i++) {
              if (!listaStreamings.includes(streamings[i]['service'])) {
                listaStreamings.push(streamings[i]['service'])
                listaLinks.push(streamings[i]['link'])
              }
            }
            geralStreaming.push(listaStreamings)
            geralLinks.push(listaLinks)
            contador++;
          } 
          n++;
        }
        setTitulosFilmes(titulos)
        setGenerosFilmes(listaGeral)
        setStreamingsFilmes(geralStreaming)
        setLinksFilmes(geralLinks)

        } catch (error) {
        console.error(error);
      }   
  }

  
  useEffect(() => {
    if (props.rodaAPI) {
      options['params']['title'] = props.titulo
      options['params']['country'] = props.pais
      fetchData();
      props.paraDeRodar()
    }
  }, [props.rodaAPI]);

  return (
    <div className="card-container">
      {titulosFilmes.map((titulosFilmes, index) => (
        <div key={index} className="card">
          <h3 class="card-title">{titulosFilmes}</h3>
          <div>
            <ul className="card-content">
              {generosFilmes[index].map((genre, genreIndex) => (
                <li key={genreIndex}>{genre}</li>
              ))}
            </ul>
          </div>
          <div>
          <ul className="card-content">
              {streamingsFilmes[index].map((service, serviceIndex) => (
                <li key={serviceIndex}>
                  <a href={linksFilmes[index][serviceIndex]}>{service}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
