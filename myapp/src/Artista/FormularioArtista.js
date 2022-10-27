import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormSelect } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
const FormularioArtista = () => {
    const [nombre, setnombre] = useState('')
    const [genero, setgenero] = useState('')
    const [listaGenero, setListaGenero] = useState([]);

    const [nombreFetch, setnombreFetch] = useState('')

    const { id } = useParams();



    useEffect(() => {
        fetchListaGeneros();
        fetchNombre();

    }, [])
    const fetchNombre = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=artista&action=detail&id=` + id)
            .then(res => {
                setnombreFetch(res.data.nombres);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }


    const fetchListaGeneros = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=genero&action=list`)
            .then(res => {
                setListaGenero(res.data);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    let navigate = useNavigate();

    const guardarEditar = () => {
        const Genero = {
            "nombre": nombre,
            "genero": genero
        }
        axios.put('http://localhost:8080/apiSpotify/?controller=artista&action=update&id=' + id, Genero)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            }).then(
                navigate("/"));
    }

    const guardar = (e) => {
        if (id != null) {
            guardarEditar();
            return;
        }
        const Artista = {
            "nombre": nombre,
            "genero": genero
        }
        axios.post('http://localhost:8080/apiSpotify/?controller=artista&action=store', Artista)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            }).then(
                navigate("/"));
    }

    return (
        <>
            <div>
                <h1>Formulario Artista</h1>
                <label>Nombre:</label>
                <FormControl type="text" defaultValue={nombreFetch}
                    onChange={(e) => setnombre(e.target.value)}></FormControl>
                <p>Tu nombre es {nombre}</p>
                <label>Genero:</label>
                <FormSelect onChange={(e) => setgenero(e.target.value)}>
                    {
                        listaGenero.map((genero) => {
                            return (
                                <>
                                    <option value={genero.id}>{genero.nombre}</option>
                                </>
                            );
                        }
                        )
                    }

                </FormSelect>
                <p>Tu genero es {genero}</p>
                <button type="submit" onClick={guardar}>Insertar Artista</button>
            </div>
        </>

    );
}

export default FormularioArtista;