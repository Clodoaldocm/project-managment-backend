const express = require('express');

const ProjsController = require('./controlers/ProjsController');
const ActionsController = require('./controlers/ActionsController');
const ContributorController = require('./controlers/ContributorController');
const IndicatorController = require('./controlers/IndicatorController');
const SectorController = require('./controlers/SectorController');

const routes = express.Router();

routes.get('/projects/:id', ProjsController.index);
routes.post('/projects', ProjsController.create);
routes.delete("/projects/:id",ProjsController.delete);
routes.post('/projects/:id', ProjsController.update);

routes.get('/actions', ActionsController.index);
routes.post('/actions', ActionsController.create);
routes.post('/actions/:idAction', ActionsController.update);
routes.delete('/actions/:idAction', ActionsController.delete);

routes.get('/user/:id', ContributorController.index);
routes.post('/user', ContributorController.create);
routes.post('/user/:idUser', ContributorController.update);
routes.delete('/user/:idUser', ContributorController.delete);

routes.get('/indicator/:idInd', IndicatorController.index);
routes.post('/indicator', IndicatorController.create);
routes.post('/indicator/:idInd', IndicatorController.update);
routes.delete('/indicator/:idInd', IndicatorController.delete);

routes.get('/sector/:idSector', SectorController.index);
routes.post('/sector', SectorController.create);
routes.post('/sector/:idSector', SectorController.update);
routes.delete('/sector/:idSector', SectorController.delete);

module.exports = routes;
