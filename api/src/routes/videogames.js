const { Router } = require('express');
const {Videogame, Genres} = require('../db')  //nos traemos los modelos
const router = Router();
const axios = require ('axios');
const { Op } = require('sequelize');
const Api_Key = process.env.Api_Key
////////////////////////////////////////////////////////////////////////////////////

router.get('/', async (req,res,next) =>{ //get videogame/name
const {name} = req.query;
try{
    if(name){               //trae los juegos que coincidan con name.
        let gamesApi = await axios.get(`https://api.rawg.io/api/games?key=${Api_Key}&search=${name}`); //Games API
                gamesApi = gamesApi.data.results.map((g)=>{
                    return {
                        img : g.background_image,
                        name : g.name,
                        genres : g.genres.map((z) => z.name ),
                        rating : g.rating_top
                    }
                })
        let gamesDb = await Videogame.findAll({   //Games DB
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
                include: Genres,
                limit: 15,                                                      //busca en la DB limite 15
                });
                gamesDb = gamesDb.map(g=>{
                    return{
                        id : g.id,
                        img : g.img,
                        name : g.name,
                        genres : g.genres.map((z) => z.name ),
                        rating : g.rating
                    }
                })

        let gamesAll = [...gamesApi, ...gamesDb]                            //concateno los valores
        let gamesFound = gamesAll.filter(g => g.name.toLowerCase().includes(name.toLowerCase()))
        if(gamesFound.length===0){  
            res.status(404).send({error:"Juego no encontrado"})     //si no coincide, devuelve error
        }else{                                  //si coincide, devuelve los primeros 15
            gamesFound = gamesFound.slice(0,15)
            res.json(gamesFound)
        }

    }else{                  //get/videogames    trae un listado de todos los juegos formateando lo que necesito.
        let gamesApi=[]
        const firstPage = axios.get(`https://api.rawg.io/api/games?key=${Api_Key}`);
        const secondPage = axios.get(`https://api.rawg.io/api/games?key=${Api_Key}&page=2`);
        const thirdPage = axios.get(`https://api.rawg.io/api/games?key=${Api_Key}&page=3`);
        const fourthPage = axios.get(`https://api.rawg.io/api/games?key=${Api_Key}&page=4`);
        const fifthPage = axios.get(`https://api.rawg.io/api/games?key=${Api_Key}&page=5`);
        let allPetitions = await Promise.all([firstPage, secondPage, thirdPage, fourthPage, fifthPage]);
        pageOne = allPetitions[0].data.results;
        pageTwo = allPetitions[1].data.results;
        pageThree = allPetitions[2].data.results;
        pageFour = allPetitions[3].data.results;
        pageFive = allPetitions[4].data.results;
        let allPages = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
        allPages.forEach((g) => {
            gamesApi.push({
                id : g.id,         
                name : g.name,
                img : g.background_image,
                genres : g.genres.map((g) => g.name ),
                rating : g.rating_top
            });
        });            

        const gameDb = await Videogame.findAll({
            include: Genres,
            limit: 100,
        }) //traigo todo de la DB local
        const gamesDb = gameDb.map(g=>{
            return{
                id : g.id,
                img : g.img,
                name : g.name,
                genres : g.genres.map((z) => z.name ),
                rating : g.rating
            }
        })
        
        let Api_Db = [...gamesDb,...gamesApi.slice(0,100)] //concateno ambos lugares asi, para luego utilizarlos en busquedas
        Api_Db = Api_Db
        res.json(Api_Db)
    }
}catch(err){
    next(err)
}
});

/////////////////////////////////////////////////////////////////////////////////////////////
//crear nuevo juego en DB local con {name,description,updated,rating,platform,IdinDB}
//relacionado a sus géneros.
router.post('/', async (req,res,next) =>{
    const {name,description,img,updated,rating,platforms,genres} = req.body;
try {
    if(!name || !description || !platforms.length) res.status(400).send({err:"error, a required data is missing"});

    const newVideogame = await Videogame.create({name,description,img,updated,genres,rating,platforms})

    const genresDB = await Genres.findAll({
        where: {name: genres}
    })
    newVideogame.addGenres(genresDB)

    res.send(newVideogame)
} 
catch (err) {
    next(err)
}
})


module.exports = router;


//mejora en busqueda por name: ordenar alfabeticamente