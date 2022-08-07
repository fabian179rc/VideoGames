const { Router } = require('express');
const router = Router();
const axios = require ('axios');
const Api_Key = process.env.Api_Key
const {Videogame, Genres} = require('../db')  //nos traemos los modelos
////////////////////////////////////////////////////////////////////////////////////

// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

//traer el id por params**
//verificar si el id existe**
//verificar que clase de id es**
//si el id es de API hacer el llamado a la api
//si el id es de la DB, buscarlo ahi
//si no se encuentra el id, devolver un mensaje
//incluir los generos asociados???///////////////////////////////
router.get('/:id', async (req,res,next) =>{
    const {id} = req.params;
    // if(!Number(id)) res.status(404).send("ID not a Number!") //validar si el ID es un numero

    try{
        let game, response;
        if(id.length < 8){
             response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${Api_Key}`)).data; //Game API por ID
             game = {
                        id: id,
                        name : response.name,
                        img : response.background_image,
                        description: response.description,
                        updated: response.updated,
                        rating : response.rating_top,
                        platforms: response.platforms.map((p) => p.platform.name),
                        genres : response.genres.map((z) => z.name),
                }
        }else{
            try {
                response = await Videogame.findOne({
                   where: {
                       id: id
                   },
                   include: Genres
               });
               game = {
                   id: id,
                   name: response.name,
                   img: response.img,
                   description: response.description,
                   updated: response.updated,
                   rating: response.rating,
                   platforms: response.platforms,
                   genres: response.genres.map(g => g.name)
               };
                
            } catch (error) {
               return res.send({err:"id invalid"})
            }
        }

        res.json(game)
    }
    catch(err){
        next(err)
    }
});

module.exports = router;


//Mejora: respuesta al no encontrar el ID en las DB y API
//borrar juego