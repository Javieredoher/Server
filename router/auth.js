//authentication
//url endpoint: 
//path api/login

const {Router} = require('express');
const { check } = require('express-validator');

//controllers
const {createUser, login, renewToken} = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

/* Each endpoint have tree arguments 1path (3)middleware 2controller */
//ROUTES
const router = Router ();

//NEW USERS
router.post( '/new', [
    check('name', 'El nombre completo es obligatorio').not().isEmpty(), //check middleware automatic validation (next)
          //campo,               error)             .condicion()
    check('email', 'El email es obligatorio').isEmail(), 
    check('username', 'El usuario es obligatorio').not().isEmpty(), 
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('position', 'El cargo en la empresa es obligatorio').not().isEmpty(),
    validateFields
],createUser);



//LOGIN
router.post('/', [
    check('email', 'El usuario es obligatorio').isEmail(), //check middleware automatic validation (next)
        //campo,               error)             .condicion()
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

//Revalidate TOKEN

router.get('/renew', validateJWT, renewToken);


module.exports = router;