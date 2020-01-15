const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

//rota para buscar lista dos devs
routes.get('/devs', DevController.index)
//rota para cadastrar dev
routes.post('/devs',DevController.store);
//rota para excluir um dev
routes.delete('/devs/:username/delete', DevController.destroy);
//rota para buscar devs por tecnologia (mobile)
routes.get('/search', SearchController.index);


module.exports = routes;