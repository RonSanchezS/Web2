import { Routes, Route } from "react-router-dom";
import Inicio from "./Inicio";
import AlbumList from "./Inicio/AlbumList";
import ArtistaList from "./Inicio/ArtistaList";
import FormularioArtista from "./Artista/FormularioArtista";
import AlbumFoto from "./Upload/AlbumFoto";
import FormularioGenero from "./Genero/FormularioGenero";
import FormularioCancion from "./Cancion/FormularioCancion";
import SubirAudio from "./utilidades/SubirAudio";
import FormularioAlbum from "./Album/FormularioAlbum";
import GeneroFoto from "./Upload/GeneroFoto";
import ArtistaFoto from "./Upload/ArtistaFoto";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/albumes" element={<AlbumList />} />
            <Route path="/genero/:id" element={<ArtistaList />} />
            <Route path="/genero/:id/:nombre" element={<ArtistaList />} />
            <Route path="/album/:id" element={<AlbumList />} />
            <Route path="/foto/album/:id" element={<AlbumFoto />} />
            <Route path="/foto/cancion/:id" element={<SubirAudio objeto={"cancion"} />} />
            <Route path="/foto/genero/:id" element={<GeneroFoto/>} />
            <Route path="/foto/artista/:id" element={<ArtistaFoto/>} />
            <Route path="/audio/:id" element={<SubirAudio />} />
            <Route path="/FormularioGenero/" element={<FormularioGenero />} />
            <Route path="/FormularioCancion/" element={<FormularioCancion />} />
            <Route path="/FormularioAlbum/" element={<FormularioAlbum />} />
            <Route path="/FormularioArtista/" element={<FormularioArtista></FormularioArtista>} ></Route>
            <Route path="/FormularioGenero/:id" element={<FormularioGenero />} />
            <Route path="/FormularioCancion/:id" element={<FormularioCancion />} />
            <Route path="/FormularioAlbum/:id" element={<FormularioAlbum />} />
            <Route path="/FormularioArtista/:id" element={<FormularioArtista></FormularioArtista>} ></Route>
        </Routes>

    );
}

export default RouterConfig;