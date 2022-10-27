import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Audio = ({ objeto }) => {
    const navigate = useNavigate();
    const eliminarCancion = (id) => {
        axios.delete('http://localhost:8080/apiSpotify/?controller=cancion&action=eliminar&id=' + id)
            .then(res => {
                navigate("/album/" + objeto.id)
            }
            ).then().catch(err => {
                console.log(err);
            }
            );

    }
    const editarCancion = (id) => {
        navigate("/FormularioCancion/" + id)
    }
    return (
        <>
            <p> audio de {objeto.nombre}</p>
            <audio controls>
                <source src={"http://localhost:8080/apiSpotify/img/cancion/" + objeto.id + ".mp3"} type="audio/mpeg" />
            </audio>
            <Button onClick={() => {
                navigate("/audio/" + objeto.id)
            }}>Subir audio</Button>
            <Button variant='danger' onClick={() => {
                eliminarCancion(objeto.id);
            }}>Eliminar</Button>
             <Button variant='success' onClick={() => {
                editarCancion(objeto.id);
            }}>Editar</Button>
        </>
    );
}

export default Audio;