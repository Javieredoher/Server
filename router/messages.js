// Path: api/mensajes

const {Router} = require('express');
const { getChat } = require('../controllers/messages');
const {validateJWT} = require('../middleware/validate-jwt')

const router = Router();

router.get('/:de', validateJWT, getChat);


module.exports = router;