import React from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartaCantante = ({artista}) => {
    const navigate = useNavigate();
    return ( 
        <>
           <Card style={{ width: '18rem' }} onClick={()=>{
                        navigate("/album/"+artista.id)
                    }}>
                        
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{artista.nombres}</Card.Title>
                                {artista.album.map((album) => {
                                    return (
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Title>{album.nombre}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    );
                                }
                                )};
                            </Card.Body>
                    </Card>
        </>
     );
}
 
export default CartaCantante;