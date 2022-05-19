const express = require('express');
const routerApi = require('./routes');
// const faker = require('faker');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

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
