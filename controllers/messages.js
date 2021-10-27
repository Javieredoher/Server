const Message = require('../models/message')

const getChat = async (req, res) => {

    const miId = req.uid;
    const messagesFrom = req.params.de;

    const last30 = await Message.find({
        $or: [
            {from: miId, to: messagesFrom},
            {from: messagesFrom, to: miId}
        ]
    })
    .sort({createAt: 'asc'})  //show messsage in desc order
    .limit(30);  //max 30 messages


    res.json({
        ok:true,
        messages: last30
    });
}

module.exports = {
    getChat
}