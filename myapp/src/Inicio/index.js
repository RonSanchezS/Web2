import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CartaCantante from '../Cartas/CartaCantante';
import ArtistaDelGenero from '../Artista/ArtistaDelGenero';
import Foto from '../utilidades/Foto';

const Inicio = () => {
    const [artistaList, setArtistaList] = useState([]);
    const [generoList, setgeneroList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [albumVisible, setAlbumVisible] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchArtistas();
    }, [])
    useEffect(() => {
        fetchGeneros();
    }, [])
    useEffect(() => {
        fetchAlbumes();
    }, [])

    

    const fetchArtistas = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=artista&action=list')
            .then(res => {
                setArtistaList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    {
        artistaList.map((artista) => {
            return (
                <CartaCantante artista={artista} />
            )
        })
    }

    const fetchGeneros = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=genero&action=list')
            .then(res => {
                setgeneroList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    const fetchAlbumes = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=album&action=list')
            .then(res => {
                setAlbumList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }



    const eliminarGenero = (id) => {
        axios.delete('http://localhost:8080/apiSpotify/?controller=genero&action=delete&id=' + id)
            .then(res => {
                fetchGeneros();
            }).catch(err => {
                console.log(err);
            });
    }


    return (
        <Container>

            {generoList.map((genero) => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Foto objeto={genero} tipo="genero"></Foto>
                        <Card.Body>
                            <Card.Title>{genero.nombre}</Card.Title>
                            <ArtistaDelGenero genero={genero} />
                        </Card.Body>
                        <Button onClick={() => {
                            navigate("/foto/genero/" + genero.id)
                        }}>Subir imagen de genero</Button>
                        <Button variant='danger' onClick={() => {
                            eliminarGenero(genero.id)
                        }}>Eliminar genero</Button>
                        <Button variant='success' onClick={() => {
                            navigate("/FormularioGenero/" + genero.id)
                        }}>Actualizar genero</Button>
                    </Card>

                )
            })
            }

        </Container>
    );
}

export default Inicio;


