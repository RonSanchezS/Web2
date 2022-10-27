import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormSelect } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
const FormularioCancion = () => {
    const [nombre, setnombre] = useState('')
    const [idAlbum, setidAlbum] = useState('')
    const [listaGenero, setListaGenero] = useState([]);

    const [nombreFetch, setnombreFetch] = useState('')

    const { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        fetchAlbums();
        fetchNombre();
    }, [])

    const fetchAlbums = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=album&action=list`)
            .then(res => {
                setListaGenero(res.data);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    const fetchNombre = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=cancion&action=show&id=` + id)
            .then(res => {
                setnombreFetch(res.data.nombre);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }



    const guardarEditar = () =>{
        const Genero = {
            "nombre": nombre,
            "id_album": idAlbum
        }
        axios.put('http://localhost:8080/apiSpotify/?controller=cancion&action=update&id='+id, Genero)
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
            "id_album": idAlbum
        }
        axios.post('http://localhost:8080/apiSpotify/?controller=cancion&action=store', Genero)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            }).then(
                navigate("/"));
    }

    return (
        <>
            <div>
                <h1>Crear una cancion con id= {id}</h1>
                <label>Nombre:</label>
                <FormControl type="text" defaultValue={nombreFetch}
                    onChange={(e) => setnombre(e.target.value)}></FormControl>
                <label>Album:</label>
                <select onChange={(e) => {
                    setidAlbum(e.target.value)
                }}>
                    {
                        listaGenero.map((genero) => {
                            return (
                                <>
                                    <option value={genero.id}>{genero.nombre}</option>
                                </>
                            );
                        })


                    }
                </select>

                <button type="submit" onClick={guardar}>Insertar cancion nueva</button>
            </div>
        </>

    );
}

export default FormularioCancion;