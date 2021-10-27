const { Schema, model} =require("mongoose");

const MessageSchema = Schema({

    from: {
        type: Schema.Types.ObjectId,  //Reference to users??
        ref: 'User',
        require: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true
    }
},{
    timestamps: true //date of creation and last modification
});

/* eventualy we have to send information to REST and comeback
like JSON, to prevent that the password being send*/

MessageSchema.method('toJSON', function(){
    //__v=version, _id=identificador unico db(lo genera mongo), password user
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);