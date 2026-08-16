import express from "express"; 
import db from "./config/db.js"; 
import productoRoutes from './routes/productoRoutes.js';


const app= express();
const PORT = 3000; 


app.use(express.json());
app.use('/productos', productoRoutes);




app.get("/", (req, res)=> {
    res.json({
    mensaje: "api footsy funciona OK"});
});

app.use('/productos', productoRoutes);



app.listen(PORT, () =>{
    console.log(`servidor funcionante en localhost: ${PORT}`)
});
