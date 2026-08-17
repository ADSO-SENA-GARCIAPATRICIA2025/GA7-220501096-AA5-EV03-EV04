import express from "express"; 
import db from "./config/db.js"; 
import productoRoutes from './routes/productoRoutes.js';
import categoriaRoutes from "./routes/categoriaRoutes.js";
import varianteProductoRoutes from "./routes/varianteProductoRoutes.js"
import fotoProductoRoutes from './routes/fotoProductoRoutes.js';

const app= express();
const PORT = 3000; 


app.use(express.json());
app.use('/productos', productoRoutes);
app.use('/categorias',categoriaRoutes);
app.use('/variantes', varianteProductoRoutes);
app.use('/fotos', fotoProductoRoutes);
app.use(express.static('public'));
//Express, permite que el navegador acceda directamente a los archivos que están dentro de la carpeta public.




app.get("/", (req, res)=> {
    res.json({
    mensaje: "api footsy funciona OK"});
});




app.listen(PORT, () =>{
    console.log(`servidor funcionante en localhost: ${PORT}`)
});
