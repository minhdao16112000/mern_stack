const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://minhdv16112000:minh123456@mernstack.ueqot.mongodb.net/fashi?retryWrites=true&w=majority',
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
