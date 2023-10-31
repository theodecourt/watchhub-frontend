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
    'X-RapidAPI-Key': 'f74ff156famshc8228337ff50d32p139e74jsn7f17abdef1e5',
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
        while (contador < 5) {
          //titulo
          let titulo = response.data.result[n]['title']
          var titulos = titulosFilmes
          if (!titulos.includes(titulo) && response.data.result[n]['streamingInfo'][pais]) {
            titulos.push(titulo)
            setTitulosFilmes(titulos)
          
          
            //generos
            let generos = response.data.result[n]['genres']
            var listaGeral = generosFilmes
            var listaGeneros = [];
            for (var i = 0; i < generos.length; i++) {
              if (!listaGeneros.includes(generos[i]['name'])) {
                listaGeneros.push(generos[i]['name'])
              }
            }
            listaGeral.push(listaGeneros)
            setGenerosFilmes(listaGeral)
      
            //streaming e link
            let streamings = response.data.result[n]['streamingInfo'][pais]
            var geralStreaming = streamingsFilmes
            var geralLinks = linksFilmes
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
            setStreamingsFilmes(geralStreaming)
            setLinksFilmes(geralLinks)
            contador++;
            console.log('contador ' + contador)
          } 
          n++;
        }
  
        } catch (error) {
        console.error(error);
      }   

    console.log(titulosFilmes)
    console.log(generosFilmes)
    console.log(streamingsFilmes)
    console.log(linksFilmes)  
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
    <div className="App">
      {titulosFilmes.map((titulosFilmes, index) => (
        <div key={index} className="movie-card">
          <h2>Title: {titulosFilmes}</h2>
          <div>
            <h3>Genres:</h3>
            <ul>
              {generosFilmes[index].map((genre, genreIndex) => (
                <li key={genreIndex}>{genre}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Streaming Services:</h3>
            <ul>
              {streamingsFilmes[index].map((service, serviceIndex) => (
                <li key={serviceIndex}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
