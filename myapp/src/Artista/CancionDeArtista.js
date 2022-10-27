import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import axios from 'axios';
import Audio from "../utilidades/Audio";
const CancionDeArtista = ({ album }) => {

    const [listaCancionesArtista, setListaCancionesArtista] = useState([])

    useEffect(() => {
        fetchCancionesArtista();
    }, [])

    const fetchCancionesArtista = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=cancion&action=detail&id=' + album.id)
            .then(res => {
                setListaCancionesArtista(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <p>Canciones de {album.nombre}:</p>
            {
                listaCancionesArtista.map((cancion) => {
                    return (
                        <>
                            <Card>
                                <Card.Title>{cancion.nombre}</Card.Title>
                                <Audio objeto={cancion}></Audio>
                            </Card>

                        </>
                    );
                }
                )}
        </>
    );
}

export default CancionDeArtista;