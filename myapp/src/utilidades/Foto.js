import React from 'react'

const Foto = ({ objeto, tipo }) => {
    var tipoe = JSON.stringify(tipo);
    return (
        <>
            <img src={"http://localhost:8080/apiSpotify/img/" + tipo + "/" + objeto.id + ".jpg"}
                width="286" height="286" alt={"caratula "+tipo} />
        </>
    );
}

export default Foto;