const { Router } = require('express');
const videogamesRoute = require('./videogames');
const genresRoute = require('./genres')
const videogameRoute = require('./videogame')
const router = Router();
////////////////////////////////////////////////////////////////////////////////////

// Configurar los routers
router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute);
router.use('/videogame', videogameRoute);


module.exports = router;
