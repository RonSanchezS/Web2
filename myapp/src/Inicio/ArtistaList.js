import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';


const ArtistaList = () => {
    const [listaArtistas, setArtistaList] = useState([]);
    const [listaLlena, setlistaLlena] = useState(false)
    const { id } = useParams();
    const { nombre } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchArtistas();
    }, [])

    const fetchArtistas = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=genero&action=cancion&id=' + id)
            .then(res => {
                setArtistaList(res.data);
                console.log(res.data);
                if (res != "No hay cancioness") {
                    setlistaLlena(false)
                }
            }).then().catch(err => {
                console.log(err);
            });
    }
    //if ListaLlena is empty, then show the message "No hay canciones en este genero"
   
    return (
        <Container>

            {listaArtistas.map((artista) => {
                return (
                    <Card style={{ width: '18rem' }} onClick={()=>{
                        navigate("/album/"+artista.id)
                    }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{artista.nombre}</Card.Title>
                        </Card.Body>


                    </Card>
                  
                );
            }
            )};


        </Container>


    );
}

export default ArtistaList;