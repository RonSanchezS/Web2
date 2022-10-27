import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormSelect } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';

const FormularioAlbum = () => {
    const [nombre, setnombre] = useState('')
    const [idAlbum, setidAlbum] = useState('')
    const [listaGenero, setListaGenero] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        fetchArtistas();
        fetchNombre();
    }, [])

    const fetchArtistas = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=artista&action=list`)
            .then(res => {
                setListaGenero(res.data);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    let navigate = useNavigate();

    const [nombreFetch, setnombreFetch] = useState('');


    const fetchNombre = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=album&action=show&id=` + id)
            .then(res => {
                setnombreFetch(res.data.nombre);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }
    const guardarEditar = () => {
        const Genero = {
            "nombre": nombre,
            "id_artista": idAlbum
        }
        axios.put('http://localhost:8080/apiSpotify/?controller=album&action=update&id=' + id, Genero)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            }).then(
                navigate("/"));
    }



    const guardar = (e) => {
        if(id != null){
            guardarEditar();
            return;
        }
        const Genero = {
            "nombre": nombre,
            "id_artista": idAlbum
        }
        axios.post('http://localhost:8080/apiSpotify/?controller=album&action=store', Genero)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            }).then(
                navigate("/"));
    }

    return (
        <>
            <div>
                <h1>Creacion de Album</h1>
                <label>Nombre:</label>
                <FormControl type="text" defaultValue={nombreFetch}
                    onChange={(e) => setnombre(e.target.value)}></FormControl>
                <label>Artista:</label>
                <select onChange={(e) => {
                    setidAlbum(e.target.value)
                }}>
                    {
                        listaGenero.map((genero) => {
                            return (
                                <>
                                    <option value={genero.id}>{genero.nombres}</option>

                                </>
                            );
                        })


                    }
                </select>

                <button type="submit" onClick={guardar}>Insertar album nuevo</button>
            </div>
        </>

    );
}

export default FormularioAlbum;