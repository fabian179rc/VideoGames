const { Router } = require('express');
const router = Router();
const axios = require ('axios');
const {Genres} = require('../db');
const Api_Key = process.env.Api_Key
////////////////////////////////////////////////////////////////////////////////////

// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

//verificar si la DB esta llena
//Si la DB esta llena mostrarla
//Si la DB esta vacia:
// llamar a la Api
// guardar los datos en la db y mostrarla
router.get('/', async (req,res,next) =>{
    try {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${Api_Key}`);
        genresApi.data.results.map(async g  => {   
                await Genres.findOrCreate({             //verifica si la DB tiene cada Genres, sino, lo crea. Si los tiene, no hace nada.
                  where : {name : g.name},
            })
        })
        let genres = await Genres.findAll()     //guarda los datos de la DB en un arr para mostrarlos.
        res.send(genres)
    } 
    catch (err) {
        next(err)
    }
})

module.exports = router;
