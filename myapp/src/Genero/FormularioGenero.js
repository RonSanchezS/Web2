import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormSelect } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
const FormularioGenero = () => {
    const [nombre, setnombre] = useState('')
    const [genero, setgenero] = useState('')
    const [listaGenero, setListaGenero] = useState([]);

    const [nombreFetch, setnombreFetch] = useState('')

    useEffect(() => {
        fetchNombre();

    }, []);

    const fetchNombre = () => {
        axios.get(`http://localhost:8080/apiSpotify/?controller=genero&action=detail&id=` + id)
            .then(res => {
                setnombreFetch(res.data.nombre);
                console.log(res.data);
            }).then().catch(err => {
                console.log(err);
            });
    }

    const { id } = useParams();


    let navigate = useNavigate();

    const guardar = (e) => {
        if (id) {
            const Genero = {
                "nombre": nombre,
                "genero": genero
            }
            axios.put('http://localhost:8080/apiSpotify/?controller=genero&action=update&id=' + id, Genero)
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                }).then(
                    navigate("/"));
            return;
        }
        const Genero = {
            "nombre": nombre
        }
        axios.post('http://localhost:8080/apiSpotify/?controller=genero&action=store', Genero)
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
                <h1>Formulario Genero con id = {id}</h1>
                <label>Nombre:</label>
                <FormControl type="text" defaultValue={nombreFetch}
                    onChange={(e) => setnombre(e.target.value)}></FormControl>
                <button type="submit" onClick={guardar}>Insertar Genero nuevo</button>
            </div>
        </>

    );
}

export default FormularioGenero;