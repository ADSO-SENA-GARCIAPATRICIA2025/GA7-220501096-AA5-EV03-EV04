import express from "express"; 
import db from "./config/db.js"; 
import productoRoutes from './routes/productoRoutes.js';
import categoriaRoutes from "./routes/categoriaRoutes.js";
import varianteProductoRoutes from "./routes/varianteProductoRoutes.js"

const app= express();
const PORT = 3000; 


app.use(express.json());
app.use('/dashboard/productos', productoRoutes);
app.use('/dashboard/categorias',categoriaRoutes);
app.use('/dashboard/variantes', varianteProductoRoutes);


app.get("/", (req, res)=> {
    res.json({
    mensaje: "api footsy funciona OK"});
});




app.listen(PORT, () =>{
    console.log(`servidor funcionante en localhost: ${PORT}`)
});
