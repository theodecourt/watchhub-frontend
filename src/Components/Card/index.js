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
    'X-RapidAPI-Key': '68583c2262msh5d9c2b0c008fd4cp1a943ajsn1e3f1590679a',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

export default function Card(props) {
  const [titulosFilmes, setTitulosFilmes] = useState([])
  const [generosFilmes, setGenerosFilmes] = useState([])
  const [streamingsFilmes, setStreamingsFilmes] = useState([])
  const [linksFilmes, setLinksFilmes] = useState([])
  const [achouFilme, setAchouFilme] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const pais = props.pais

  async function fetchData() {  
      try {
        setAchouFilme(true)
        const response = await axios.request(options);
        var n = 0;
        var contador = 0;
        var titulos = []
        var listaGeral = []
        var geralStreaming = []
        var geralLinks = []
        while (contador < 10 && n < 25) {
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
        setAchouFilme(false)
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
    achouFilme ? (
    <div className="card-container">
      {titulosFilmes.map((titulosFilmes, index) => (
        <div key={index} className="card">
          <h3 className="card-title">{titulosFilmes}</h3>
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
      ) : (  
      <div>
        We couldn't find any movie with this title
      </div>
      )

  );
}
