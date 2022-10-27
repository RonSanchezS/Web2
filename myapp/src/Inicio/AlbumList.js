import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Foto from '../utilidades/Foto';
import CancionDeArtista from '../Artista/CancionDeArtista';


const AlbumList = () => {

    const [listaAlbumes, setListaAlbumes] = useState([]);



    const { id } = useParams();
    const [cantante, setcantante] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbumes();
        fecthCantante();
    }, [])

    const fetchAlbumes = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=album&action=detail&id=${id}`)
            .then(res => {
                setListaAlbumes(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    const fecthCantante = () => {
        axios.get('http://localhost:8080/apiSpotify/?controller=artista&action=detail&id=' + id)
            .then(res => {
                setcantante(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    const eliminarCancion = (id) => {
        axios.delete(`http://localhost:8080/apiSpotify/?controller=album&action=eliminar&id=${id}`)
            .then(res => {
            }).then().catch(err => {
                console.log(err);
            }).then(() => {
                navigate('/');
            });
    }

    return (
        <Container>
            {
                listaAlbumes.map((album) => {
                    return (
                        <div>
                            <h1>{album.nombre}</h1>
                            <Foto objeto={album} tipo="album"></Foto>
                            <Button onClick={() => navigate(`/foto/album/${album.id}`)}>Subir foto del album</Button>
                            <Button onClick={() => navigate(`/FormularioAlbum/${album.id}`)}>Editar nombre del album</Button>
                            <Button variant='danger' onClick={() => {
                                eliminarCancion(album.id);
                            }}>Eliminar album</Button>
                            <CancionDeArtista album={album}></CancionDeArtista>
                        </div>
                    )
                })
            }
        </Container>

    );
}

export default AlbumList;