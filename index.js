const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

function initApp(db) {
    const { app, server } = initWebServer()

    app.get('/he', (req, res) => {
        // db.collection('xx').findOne()
        res.json({ ok: true })
    })

    console.log('App ready')
}


function initWebServer() {
    const app = express()

    app.disable('x-powered-by');

    app.set('views', __dirname + '/views');
    app.set('view engine', 'twig');

    // This section is optional and can be used to configure twig.
    app.set('twig options', {
        allow_async: true,
        strict_variables: false
    });

    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    const server = app.listen(8091, (err) => {
        if (err) {
            console.error(err)
            throw new Error('WebServer cannot listen to 8091')
        }
        console.log('WebServer started at port', 8091)
    })

    return { app, server }
}

MongoClient.connect(
    'mongodb://localhost:27017/pastebin_like',
    { useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            console.error(error.message)
            return process.exit(1)
        }
        initApp(client)
    }
)

