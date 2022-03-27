const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://minhdao161120:Minh16112000@mernstack.ueqot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
            }
        );

        console.log('connect successfully !!!');
    } catch (error) {
        console.log('connect failure !!!');
    }
}

module.exports = { connect };
