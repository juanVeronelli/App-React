const db = require('mongoose');
db.Promise = global.Promise;

async function connect(url) {
    try {
        await db.connect(url, {
            useNewUrlParser: true,
        });
        console.log('[db] Conectada con éxito');
    }
    catch (err){
        console.log(err)
    }
}

module.exports = connect;