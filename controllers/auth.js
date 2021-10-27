//controllers related to endpoints
const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt')


//REGISTER
const createUser = async (req, res =response) => {

    try {

        const {name, email, username, password, position} = req.body;

        //verify that email doesn't exists
        const existEmail = await User.findOne({ email});
        if (existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }
        
        const existUsername = await User.findOne({ username});
        if (existUsername){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        // create an instance of user
        const user = new User(req.body);

        // ENCRYPT password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // SAVE USER IN DATABASE
        //save new user
        await user.save();

        //Use JWT to authent
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,  //serialize the user (uid)
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el encargado"
        });
    }
}



//LOGIN
const login = async (req, res =response) => {

    const {email, password} = req.body;

    try{
        // verify if username exist
        const userDB = await User.findOne({ email});
        if ( !userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //verify if password is correct
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            })
        }

        //Email and password did match, now create JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el encargado"
        });
    }
}

//RENEW TOKEN

const renewToken = async (req, res =response) => {

    const uid = req.uid;

    //generate new JWT
    const token = await generateJWT(uid);

    //Bring user for uid
    const user = await User.findById(uid);


    res.json({
        ok: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}