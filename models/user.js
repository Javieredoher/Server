const { Schema, model} =require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    }, 
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    online:{
        type: Boolean,
        default: false
    },
    position:{
        type: String,
        require: true,
    }
});

/* eventualy we have to send information to REST and comeback
like JSON, to prevent that the password being send*/

UserSchema.method('toJSON', function(){
    //__v=version, _id=identificador unico db(lo genera mongo), password user
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;  //to the rest of the object
    return object;
});

module.exports = model('User', UserSchema);