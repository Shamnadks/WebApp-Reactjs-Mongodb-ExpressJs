const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/ADMIN-CLIENT-SERVER', (err) => {
    if (!err) console.log(`db connected `);
    else console.log(`db error${err}`);
});


