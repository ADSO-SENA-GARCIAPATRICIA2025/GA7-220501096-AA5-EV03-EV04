import express from "express"; 
import db from "./config/db.js"; 
import productoRoutes from './routes/productoRoutes.js';
import categoriaRoutes from "./routes/categoriaRoutes.js";

const app= express();
const PORT = 3000; 


app.use(express.json());
app.use('/productos', productoRoutes);
app.use('/categorias',categoriaRoutes);



app.get("/", (req, res)=> {
    res.json({
    mensaje: "api footsy funciona OK"});
});




app.listen(PORT, () =>{
    console.log(`servidor funcionante en localhost: ${PORT}`)
});
