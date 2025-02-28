const Message = require('../models/Message');

module.exports = (io, socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
    });

    socket.on('message', async (data) => {
        const message = new Message(data);
        await message.save();
        io.to(data.room).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
