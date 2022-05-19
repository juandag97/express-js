const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
// const faker = require('faker');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, cb) => {
        if (whitelist.includes(origin) || !origin) {
            cb(null, true);
        } else {
            cb(new Error('No permitido'));
        }
    }
};
app.use(cors(options));

app.get('/', (req, res) => {
    res.send("Hello from my express server");
});

app.get('/new-route', (req, res) => {
    res.send("Hello from the new route");
});



routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);




app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    });
});

app.get('/users', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({
            limit,
            offset
        });
    } else {
        res.send('No hay parametros');
    }
});

app.listen(port, () => {
    console.log('My current port: ' + port);
});
