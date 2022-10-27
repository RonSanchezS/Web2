import React, { useEffect, useState } from 'react'
import CartaCantante from '../Cartas/CartaCantante';

import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Foto from '../utilidades/Foto';

const ArtistaDelGenero = ({ genero }) => {
    const navigate = useNavigate();
    const [ArtistaList, setArtistaList] = useState([]);
    useEffect(() => {
        fetchArtistasDelGenero();
    }, [])


    const eliminarArtista = (id) => {
        axios.delete('http://localhost:8080/apiSpotify/?controller=artista&action=delete&id=' + id)
            .then(res => {
                console.log('ok');
                fetchArtistasDelGenero();
            }).catch(err => {
                console.log(err);
            });
    }

    const fetchArtistasDelGenero = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=genero&action=cancion&id=' + genero.id)
            .then(res => {
                setArtistaList(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }


    return (
        <>

            {

                ArtistaList.map((artista) => {
                    return (
                        <>
                            <Card>
                                <Foto objeto={artista} tipo="artista"></Foto>
                                <Container onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/album/" + artista.id)
                                }}>
                                    {artista.nombre}

                                </Container>

                                <Button onClick={() => {
                                    navigate("/FormularioArtista/" + artista.id)
                                }}>Actualizar</Button>
                                <Button onClick={() => {
                                    eliminarArtista(artista.id)
                                }} variant='danger'>Eliminar</Button>
                                <Button onClick={() => {
                                    navigate("/foto/artista/" + artista.id)
                                }} variant="success">Subir foto</Button>
                            </Card>

                        </>
                    );
                }
                )}
        </>
    );
}

export default ArtistaDelGenero;